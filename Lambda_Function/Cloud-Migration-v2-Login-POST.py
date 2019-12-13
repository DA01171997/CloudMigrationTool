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

def mySqlFunctionHandler(event, context):
    data={}
    # requestData = json.loads(event['body'])
    # data['uEmail'] = requestData['uEmail']
    # data['uPassword'] = requestData['uPassword']
    
    data['uEmail'] = event['uEmail']
    data['uPassword'] = event['uPassword']
    with connection.cursor() as cur:
        try:
            sql_command = 'SELECT * FROM users WHERE uEmail="{}" AND uPassword="{}"'.format(data['uEmail'], data['uPassword'])
            print(sql_command)
            cur.execute(sql_command)
            results = cur.fetchall()
            if len(results) != 1:
                return {
                'statusCode': 404,
                'body': json.dumps("User Not Found!")
                } 
        except Exception as error:
            logger.error(str(error)) 
            return {
                'statusCode': 404,
                'body': json.dumps(str(error))
            }
    # connection.commit()        
    return { 'statusCode': 200, 'body': json.dumps(results) }
    
            

    