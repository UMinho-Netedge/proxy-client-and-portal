from flask import Flask, request, Response
import requests
from pymongo import MongoClient
from src.schemas import *
from src.models import *
from src.error import Error
from flask_cors import CORS

app = Flask(__name__)

client = MongoClient("mongodb://mongodb_client:27018/")

db = client["mydatabase"]
AddressChange = db["AddressChange"]
AppContextDelete = db["AppContextDelete"]
AppContextUpdate = db["AppContextUpdate"]
AppLocationAvailability = db["AppLocationAvailability"]

CORS(app, origins='*', send_wildcard=True, support_credentials=True, expose_headers='Authorization', simple_headers=True)

@app.route('/ping', methods=['GET'])
def test_connection():
    try:
        client.admin.command('ping')
        return {"status":"pong"}
    except:
        return 500

def send_notification_to_react(response):
    react_app_url = "http://localhost:3000/notifications"
    requests.post(react_app_url, json=response)

@app.route('/callback_ref', methods=["GET",'POST'])
def notifications():
    body = request.get_json()
    try: 
        if body["notificationType"] == "AddressChangeNotification":
            data = AddressChangeNotification.from_json(body)
            AddressChange.insert_one(object_to_mongodb_dict(data.to_json()))
            send_notification_to_react(object_to_mongodb_dict(data.to_json()))
        elif body["notificationType"] == "AppContextDeleteNotification":
            data = AppContextDeleteNotification.from_json(body)
            AppContextDelete.insert_one(object_to_mongodb_dict(data.to_json()))
            send_notification_to_react(object_to_mongodb_dict(data.to_json()))
        elif body["notificationType"] == "AppContextUpdateNotification":
            data = AppContextUpdateNotification.from_json(body)
            AppContextUpdate.insert_one(object_to_mongodb_dict(data.to_json()))
            send_notification_to_react(object_to_mongodb_dict(data.to_json()))
        elif body["notificationType"] == "AppLocationAvailabilityNotification":
            data = AppLocationAvailabilityNotification.from_json(body)
            AppLocationAvailability.insert_one(object_to_mongodb_dict(data.to_json()))
            send_notification_to_react(object_to_mongodb_dict(data.to_json()))
        else:
            msg = "Notification type not valid!"
            return Error.error_400(msg)
        return Response(status=204)

    except Exception as e:
        if e.__class__.__name__ == "ValidationError":
            msg = "Request body not valid, jsonschema.exceptions.ValidationError"
            return Error.error_400(msg)

    
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