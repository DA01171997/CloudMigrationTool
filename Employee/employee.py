import os
import sys
import flask_api
import pugsql
from flask import request, jsonify, Response
from flask_api import status, exceptions
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash, check_password_hash

app = flask_api.FlaskAPI(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

def crawl(pwd='/'):
    crawl_cmd = 'du -a -h --time --max-depth=1 ' + pwd + ' 2>/dev/null'
    path_cmd = 'pwd'
    directory_list = []
    abs_path = os.popen(path_cmd).read().split('\n')[0]
    directory = os.popen(crawl_cmd).read().split('\n')
    for i in range(0, len(directory) - 2):
        size, time, path = directory[i].split('\t')
        split_path = path.split('/')
        name = split_path[len(split_path) - 1]
        path = abs_path + '/' + name
        if os.path.isfile(path):
            file_type = 0
        else:
            file_type = 1
        directory_list.append([name, size, file_type, time, path])
    return directory_list

@app.route('/', methods=['GET'])
@cross_origin()
def home():
    return crawl(pwd='.')

@app.route('/api/v1/cloud/employee/crawl', methods=['POST', 'GET'])
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
    return result

@app.route('/api/v1/cloud/employee/copy', methods=['POST', 'GET'])
@cross_origin()
def copy_cloud():
    if request.method=='GET':
        return {}
    elif request.method=='POST':
        return copy_cloud_post()

def copy_cloud_post():
    copy_data = request.data
    required_fields = ['sourceIP', 'sourcePath', 'destinationIP', 'destinationPath', 'recursive', 'private_key', 'private_key_name']
    if not all([field in copy_data for field in required_fields]):
        raise exceptions.ParseError()
    try:
        data = copy_data
    except Exception as e:
        return { 'Error': str(e) }, status.HTTP_409_CONFLICT
    return data