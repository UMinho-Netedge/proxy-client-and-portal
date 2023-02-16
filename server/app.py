from flask import Flask, request, Response, jsonify, redirect
import requests
from pymongo import MongoClient
from src.schemas import *
from src.models import *
from src.error import Error
from flask_cors import CORS
import datetime

app = Flask(__name__)

client = MongoClient("mongodb://mongodb_client:27018/")

db = client["mydatabase"]
AddressChange = db["AddressChange"]
AppContextDelete = db["AppContextDelete"]
AppContextUpdate = db["AppContextUpdate"]
AppLocationAvailability = db["AppLocationAvailability"]
ContextId = db["ContextId"]
notifications = db['notifications']

CORS(app, origins='*', send_wildcard=True, support_credentials=True, expose_headers='Authorization', simple_headers=True)
    
@app.route('/ping', methods=['GET'])
def test_connection():
    try:
        client.admin.command('ping')
        return {"status":"pong"}
    except:
        return 500

url = "http://host.docker.internal:8080/app_contexts"
@app.route('/app_contexts', methods=['POST'])
def def_context_id():
    if request.method == "POST":
        body = request.get_json()
        headers = {
            'Content-Type': 'application/json'
        }
        response = requests.post(url, json=body, headers=headers)

        try:
            response_json = response.json()
        except:
            response_json = {}

        if response.status_code == 201:
            ContextId.insert_one({"contextId":body["contextId"]})

        return jsonify({
            'status': response.status_code,
            'body': response_json
        })

@app.route('/app_contexts/<contextId>', methods=['PUT'])
def put_contexts(contextId):
    body = request.get_json()
    response = requests.put('%s/%s' % (url, contextId), json=body)

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
    response = requests.delete('%s/%s' % (url, contextId))

    try:
        response_json = response.json()
    except:
        response_json = {}

    if response.status_code == 204:
        ContextId.delete_one({"contextId":contextId})

    return jsonify({
        'status': response.status_code,
        'body': response_json
    })

@app.route('/callback_ref', methods=['POST'])
def def_notifications():
    try: 
        body = request.get_json()
        if body["notificationType"] == "AddressChangeNotification":
            data = AddressChangeNotification.from_json(body)
            AddressChange.insert_one(object_to_mongodb_dict(data.to_json()))  
        elif body["notificationType"] == "AppContextDeleteNotification":
            data = AppContextDeleteNotification.from_json(body)
            AppContextDelete.insert_one(object_to_mongodb_dict(data.to_json()))
        elif body["notificationType"] == "AppContextUpdateNotification":
            data = AppContextUpdateNotification.from_json(body)
            AppContextUpdate.insert_one(object_to_mongodb_dict(data.to_json()))
        elif body["notificationType"] == "AppLocationAvailabilityNotification":
            data = AppLocationAvailabilityNotification.from_json(body)
            AppLocationAvailability.insert_one(object_to_mongodb_dict(data.to_json()))
        else:
            msg = "Notification type not valid!"
            return_msg, return_code = Error.error_400(msg)
            add_log(return_msg, return_code)
            return return_msg, return_code
        add_log(body, 204)
        return Response(status=204)

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

@app.route('/notifications', methods=['GET'])
def last_request():
    try: 
        last_request = notifications.find().sort("_id", -1).limit(1)[0]
        last_request['_id'] = str(last_request['_id'])
        
        contextIdCollection = []
        for cont in ContextId.find({},{ "_id": 0, "contextId": 1}):
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

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = 5005, debug = True)