from flask import Flask, request, Response, jsonify
import os
import requests
import threading
from pymongo import MongoClient
from src.schemas import *
from src.models import *
from src.error import Error
from src.performance import *
from flask_cors import CORS
from uuid import uuid4
import datetime

app = Flask(__name__)


associateDevAppId = str(uuid4())
# mx2 server (UALCMP)
ualcmp_addr = os.environ.get("UALCMP_SERVER")
ualcmp_port = os.environ.get("UALCMP_PORT")
url = "http://%s:%s/dev_app/v1" %(ualcmp_addr, ualcmp_port)

# dados predefinidos no docker compose
mongodb_addr = os.environ.get("ME_CONFIG_MONGODB_SERVER")
mongodb_port = int (os.environ.get("ME_CONFIG_MONGODB_PORT"))
mongodb_username = os.environ.get("ME_CONFIG_MONGODB_ADMINUSERNAME")
mongodb_password = os.environ.get("ME_CONFIG_MONGODB_ADMINPASSWORD")
client = MongoClient(host=mongodb_addr, port=mongodb_port, username=mongodb_username, password=mongodb_password)

db = client["ualcmp-client"]
Context = db["Contexts"]
notifications = db['notifications']

# CORS(app, origins='*', send_wildcard=True, support_credentials=True, expose_headers='Authorization', simple_headers=True)
CORS(app)

@app.before_request 
def option_before_request(): 
    if request.method == "OPTIONS": 
        response = jsonify({}) 
        response.headers.add("Access-Control-Allow-Origin", "*") 
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS") 
        response.headers.add("Access-Control-Allow-Headers", "*") 
        return response 
    
@app.route('/ping', methods=['GET'])
def test_connection():
    try:
        client.admin.command('ping')
        return {"status":"pong"}
    except:
        return 500

@app.route('/login', methods=['POST'])
def get_credentials():
    if request.method == 'POST':
        app.logger.info('received a login request')
        credentials = request.json
        credentials['associateDevAppId'] = associateDevAppId
        response = requests.post(url + '/login', json=credentials)
        if response.status_code == 200:
            return response.json()
        else:
            return Error.error_401(response.text)

@app.route('/refresh', methods=['POST'])
def update_credentials():
    auth_header = request.headers.get('Authorization')
    headers = {'Authorization' : auth_header}
    app.logger.info('received a refresh token request from: %s' %headers)
    response = requests.post(url + '/refresh', headers=headers)
    app.logger.info(response.text)
    if response.status_code == 200:
        return response.text
    else:
        return Error.error_401(response.text)

@app.route('/logout', methods=['POST'])
def remove_credentials():
    auth_header = request.headers.get('Authorization')
    headers = {'Authorization' : auth_header}
    app.logger.info('received a logout request from: %s' %headers)
    response = requests.post(url + '/logout', headers=headers)

    app.logger.info(response.text)
    if response.status_code == 200:
        return response.text
    else:
        return Error.error_401(response.text)


@app.route('/app_list', methods=['GET'])
def def_app_list():
    
    auth_header = request.headers.get('Authorization')
    headers = {'Authorization' : auth_header}
    app.logger.info('received a get app list request from: %s' %headers)

    query_params = request.args.to_dict()

    response = requests.get(url + '/app_list', params=query_params, headers=headers)

    try:
        response_json = response.json()
    except:
        response_json = {}

    return jsonify({
        'status': response.status_code,
        'body': response_json
    })

@app.route('/app_contexts', methods=['POST'])
def def_context_id():
    body = request.get_json()
    if 'vendorSpecificExt' in body.keys():
        body.pop('vendorSpecificExt')
    body['associateDevAppId'] = associateDevAppId
    auth_header = request.headers.get('Authorization')
    headers = {'Authorization' : auth_header}
    app.logger.info('Received a post context request from: %s' %headers)
    response = requests.post("%s/app_contexts" % (url), json=body, headers=headers)
    app.logger.info("App context create response: %s" %response.text)
    try:
        response_json = response.json()
    except:
        response_json = {}

    if response.status_code == 201:
        Context.insert_one(response_json)
    
    app.logger.info(response_json)

    if '_id' in response_json.keys():
        response_json.pop('_id')

    return response_json, response.status_code

@app.route('/app_contexts/<contextId>', methods=['PUT'])
def put_contexts(contextId):
    body = request.get_json()
    body['associateDevAppId'] = associateDevAppId
    auth_header = request.headers.get('Authorization')
    headers = {'Authorization' : auth_header}
    app.logger.info('received a put context request from: %s' %headers)
    response = requests.put('%s/app_contexts/%s' % (url, contextId), json=body, headers=headers)

    try:
        response_json = response.json()
    except:
        response_json = {}

    return jsonify({
        'status': response.status_code,
        'body': response_json
    })

@app.route('/app_contexts/<contextId>', methods=['DELETE'])
def del_contexts(contextId):
    auth_header = request.headers.get('Authorization')
    headers = {'Authorization' : auth_header}
    app.logger.info('received a delete context request from: %s\n sending it to %s/app_contexts/%s' %(headers, url, contextId))
    response = requests.delete('%s/app_contexts/%s' %(url, contextId), headers=headers)
    app.logger.info(response.text)

    if response.status_code == 204:
        Context.delete_one({"contextId":contextId})
        return '', 204

    return response.json(), response.status_code

@app.route('/obtain_app_loc_availability', methods=['POST'])
def def_obtain_app_loc_availability():
    body = request.get_json()
    body['associateDevAppId'] = associateDevAppId
    auth_header = request.headers.get('Authorization')
    headers = {'Authorization' : auth_header}
    app.logger.info('received a obtain app loc availability request from: %s' %headers)
    response = requests.post("%s/obtain_app_loc_availability" % (url), json=body, headers=headers)

    try:
        response_json = response.json()
    except:
        response_json = {}

    return jsonify({
        'status': response.status_code,
        'body': response_json
    })

@app.route('/callback_ref', methods=['POST'])
def def_notifications():
    try: 
        body = request.get_json()
        return_code = 204
        if body["notificationType"] == "AddressChangeNotification":
            data = AddressChangeNotification.from_json(body)
        elif body["notificationType"] == "AppContextDeleteNotification":
            data = AppContextDeleteNotification.from_json(body)
        elif body["notificationType"] == "AppContextUpdateNotification":
            data = AppContextUpdateNotification.from_json(body)
        elif body["notificationType"] == "AppLocationAvailabilityNotification":
            data = AppLocationAvailabilityNotification.from_json(body)
        else:
            msg = "Notification type not valid. \n %s" %str(body)
            data, return_code = Error.error_400(msg)
        add_log(data, return_code)
        return data, return_code

    except:
        msg = "Request body not valid, jsonschema.exceptions.ValidationError"
        return_msg, return_code = Error.error_400(msg)
        add_log(return_msg, return_code)
        return return_msg, return_code 

def add_log(body, statusCode):
    notifications.insert_one({
        'time': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'body': body,
        "status": statusCode
    })

@app.route('/network_report', methods=['POST'])
def network_report():
    body = request.get_json()

    try:
        thread = threading.Thread(target=network_report_thread, args=(body["host_list"], body["runs"], body["interval"]))
        thread.start()
        report = "Performance test started!"
        status = 200
    except Exception as e:
        # msg = "Performance test not available!"
        report, status = Error.error_400(str(e))

    return report, status

     
def network_report_thread(host_list, runs, interval):
    report = complete_test(host_list, runs, interval)
    response = requests.post("%s/network_performance_results" % (url), json=report)
    app.logger.info(response.text)



@app.route('/notifications', methods=['GET'])
def last_request():
    try: 
        last_request = notifications.find().sort("_id", -1).limit(1)[0]
        last_request['_id'] = str(last_request['_id'])
        
        contextIdCollection = []
        for cont in Context.find({},{ "_id": 0, "contextId": 1}):
            contextIdCollection.append(cont["contextId"])

        return jsonify(last_request, contextIdCollection)
    except:
        return jsonify("Not yet!")

@app.errorhandler(400)
def page_not_found(e):
    msg = "No request parameters found, request Content-Type was not {application/json}"
    return Error.error_400(msg)

@app.errorhandler(403)
def page_not_found(e):
    msg = "Operation is not allowed given the current status of the resource."
    return Error.error_403(msg)

@app.errorhandler(404)
def page_not_found(e):
    return Error.error_404()

app.run(host = "0.0.0.0", port = 5005, debug = True)