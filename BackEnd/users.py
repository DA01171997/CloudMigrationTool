import sys
import flask_api
import pugsql
from flask import request, jsonify, Response
from flask_api import status, exceptions
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from crawler import crawl

app = flask_api.FlaskAPI(__name__)
#CORS(app)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config.from_envvar('APP_CONFIG')

queries = pugsql.module('queries/user')
queries.connect(app.config['DATABASE_URL'])


@app.route('/', methods=['GET'])
@cross_origin()
def home():
    return crawl(pwd='.')
    # return '''<h1>Cloue-Works-SERVICE</h1>'''


@app.route('/api/v1/cloud/users/register', methods=['POST', 'GET'])
@cross_origin()
def register():
    if request.method=='GET':
        all_users=queries.all_users()
        data = list(all_users)
        return data, status.HTTP_200_OK
    elif request.method=='POST':
        return create_user()

def create_user():
    user = request.data
    required_fields = ['uName','uEmail','uPassword']
    if not all([field in user for field in required_fields]):
        raise exceptions.ParseError()
    try:
        user['uPassword'] = generate_password_hash(user['uPassword'])
        user['uID'] = queries.create_user(**user)
    except Exception as e:
        return { 'Error': str(e) }, status.HTTP_409_CONFLICT
    return user, status.HTTP_201_CREATED


@app.route('/api/v1/cloud/users/id/<int:uID>', methods=['DELETE', 'GET'])
def user_id(uID):
    if request.method=='GET':
        return get_user_by_id(uID)
    elif request.method=='DELETE':
        return delete_user_by_id(uID)
    
def get_user_by_id(uID):
    try:
        user = queries.user_by_id(iuID=uID)
        if user:
            return user, status.HTTP_200_OK
        else:
            raise exceptions.ParseError()
    except Exception as e:
        return { 'Error': str(e) }, status.HTTP_404_NOT_FOUND 

def delete_user_by_id(uID):
    try:
        affected = queries.user_delete_by_id(userID=uID)
        if affected == 0:
            return { 'Error': "USER NOT FOUND" },status.HTTP_404_NOT_FOUND
        else:
            return { 'DELETE REQUEST ACCEPTED': str(uID) }, status.HTTP_202_ACCEPTED               
    except Exception as e:
        return { 'Error': str(e) }, status.HTTP_409_CONFLICT 

@app.route('/api/v1/cloud/users/login', methods=['POST'])
def login():
    if request.method=='POST':
        return authenticate()
    
def authenticate():
    user = request.data
    required_fields = ['uEmail','uPassword']
    if not all([field in user for field in required_fields]):
        raise exceptions.ParseError()
    try:
        user2 = queries.login_by_email(**user)
        if user2:
            if check_password_hash(user2['uPassword'],user['uPassword']):
                return user2, status.HTTP_200_OK
        return { 'Error': 'Login information invalid' }, status.HTTP_401_UNAUTHORIZED
    except Exception as e:
        return { 'Error': str(e) }, status.HTTP_409_CONFLICT

@app.route('/api/v1/cloud/crawl', methods=['POST', 'GET'])
@cross_origin()
def crawl_cloud():
    if request.method=='GET':
        return crawl(pwd='.')
    elif request.method=='POST':
        return crawl_cloud_post()

def crawl_cloud_post():
    crawl_data = request.data
    required_fields = ['path']
    if not all([field in crawl_data for field in required_fields]):
        raise exceptions.ParseError()
    try:
        path = crawl_data['path']
        result = crawl(path)
    except Exception as e:
        return { 'Error': str(e) }, status.HTTP_409_CONFLICT
    return result, status.HTTP_201_CREATED
