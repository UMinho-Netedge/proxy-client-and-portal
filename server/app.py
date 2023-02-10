from flask import Flask, request, Response, jsonify
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
log_request = db['log_request']

CORS(app, origins='*', send_wildcard=True, support_credentials=True, expose_headers='Authorization', simple_headers=True)

@app.before_request
def def_log_request():
   log_request.insert_one({
        'time': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'method': request.method,
        'url': request.url,
        'headers': dict(request.headers),
        'body': request.get_data().decode('utf-8'),
    })
    
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

        if response.status_code == 201:
            ContextId.insert_one({"contextId":body["contextId"]})

        return jsonify({
            'status': response.status_code,
            'body': response.json()
        })

@app.route('/app_contexts/<contextId>', methods=["PUT", "DELETE"])
def de_context_id_other(contextId):
    if request.method == "PUT":
        body = request.get_json()
        response = requests.put('%s/%s' % (url, contextId), json=body)

        return jsonify({
            'status': response.status_code,
            'body': response.json()
        })

    elif request.method == "DELETE":
    
        response = requests.delete('%s/%s' % (url, contextId))

        if response.status_code == 201:
            ContextId.delete_one({"contextId":contextId})

        return jsonify({
            'status': response.status_code,
            'body': response.json()
        })

@app.route('/callback_ref', methods=['POST'])
def notifications():
    body = request.get_json()
    try: 
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
            return Error.error_400(msg)
        return Response(status=204)

    except Exception as e:
        if e.__class__.__name__ == "ValidationError":
            msg = "Request body not valid, jsonschema.exceptions.ValidationError"
            return Error.error_400(msg)

@app.route('/notifications', methods=['GET'])
def last_request():
    try: 
        myquery = { "method": "POST" }
        last_request = log_request.find(myquery).sort("_id", -1).limit(1)[0]
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