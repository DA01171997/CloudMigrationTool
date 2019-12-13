import sys
import logging
import pymysql
import json
logger = logging.getLogger()
logger.setLevel(logging.INFO)

host  = ''
user = ''
password = ''
db_name = ''

try:
    connection = pymysql.connect(host, user=user, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as error:
    logger.error("Could not connect to database: " + db_name )
    logger.error(error)
    sys.exit()

logger.info("Connected to database: " + db_name)
import json
import requests
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)
def lambda_handler(event, context):
    logger.info(event)
    logger.info(context)
    # print(event)
    #js = json.loads(event['body'])
    #logger.info(response)
    url = event['url']
    #logger.info(url)
    payload = {"path": event['path']}
    response = requests.post(url, json = payload)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.loads(json.dumps(response.text))
    }

def mySqlFunctionHandler(event, context):
    data={}
    requestData = json.loads(event['body'])
    data['uName'] = requestData['uName']
    data['uEmail'] = requestData['uEmail']
    data['uPassword'] = requestData['uPassword']
    with connection.cursor() as cur:
        try:
            sql_command = 'Insert into users (uName, uEmail, uPassword) VALUES ("{}", "{}", "{}")'.format(data['uName'], data['uEmail'], data['uPassword'])
            print(sql_command)
            cur.execute(sql_command)
            connection.commit()
        except pymysql.IntegrityError as error:
            logger.error(str(error)) 
            return {
                'statusCode': 409,
                'body': json.dumps(str(error))
            }
    # connection.commit()        
    return { 'statusCode': 201, 'body': json.dumps(data) }
    
            

    