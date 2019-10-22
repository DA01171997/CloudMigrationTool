import sys
import flask_api
import pugsql
from flask import request, jsonify, Response
from flask_api import status, exceptions
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from crawler import crawl

app = flask_api.FlaskAPI(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config.from_envvar('APP_CONFIG')

queries = pugsql.module('queries/account')
queries.connect(app.config['DATABASE_URL'])


@app.route('/', methods=['GET'])
@cross_origin()
def home():
    return crawl(pwd='.')
    # return '''<h1>Cloue-Works-SERVICE</h1>'''


@app.route('/api/v1/cloud/accounts/register', methods=['POST', 'GET'])
@cross_origin()
def register():
    if request.method=='GET':
        all_accounts=queries.all_accounts()
        data = list(all_accounts)
        return data
    elif request.method=='POST':
        return create_account()

def create_account():
    account = request.data
    required_fields = ['aName','aEmail','aPassword']
    if not all([field in account for field in required_fields]):
        raise exceptions.ParseError()
    try:
        account['aPassword'] = generate_password_hash(account['aPassword'])
        account['aID'] = queries.create_account(**account)
    except Exception as e:
        return { 'Error': str(e) }, status.HTTP_409_CONFLICT
    return account, status.HTTP_201_CREATED


@app.route('/api/v1/cloud/accounts/id/<int:aID>', methods=['DELETE', 'GET'])
@cross_origin()
def account_id(aID):
    if request.method=='GET':
        return get_account_by_id(aID)
    elif request.method=='DELETE':
        return delete_account_by_id(aID)
    
def get_account_by_id(aID):
    try:
        account = queries.account_by_id(aID=aID)
        if account:
            return account
        else:
            raise exceptions.ParseError()
    except Exception as e:
        return { 'Error': str(e) }, status.HTTP_404_NOT_FOUND 

def delete_account_by_id(aID):
    try:
        affected = queries.account_delete_by_id(aID=aID)
        if affected == 0:
            return { 'Error': "USER NOT FOUND" },status.HTTP_404_NOT_FOUND
        else:
            return { 'DELETE REQUEST ACCEPTED': str(aID) }, status.HTTP_202_ACCEPTED               
    except Exception as e:
        return { 'Error': str(e) }, status.HTTP_409_CONFLICT 

@app.route('/api/v1/cloud/accounts/login', methods=['POST'])
@cross_origin()
def login():
    if request.method=='POST':
        return authenticate()
    
def authenticate():
    account = request.data
    required_fields = ['aEmail','aPassword']
    if not all([field in account for field in required_fields]):
        raise exceptions.ParseError()
    try:
        account2 = queries.login_by_email(**account)
        if account2:
            if check_password_hash(account2['aPassword'],account['aPassword']):
                return account2
        return { 'Error': 'Login information invalid' }, status.HTTP_401_UNAUTHORIZED
    except Exception as e:
        return { 'Error': str(e) }, status.HTTP_409_CONFLICT

