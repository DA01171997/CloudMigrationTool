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
