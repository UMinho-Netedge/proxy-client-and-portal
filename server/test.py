from flask import Flask, request, make_response, jsonify
import requests
from flask_cors import CORS, cross_origin

app = Flask(__name__)
#CORS(app, origins='*', send_wildcard=True, support_credentials=True, expose_headers='Authorization', simple_headers=True)

@app.route("/app_contexts", methods=['POST', 'OPTIONS'])
def handle_post():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Max-Age'] = '3600'
        return response
    data = request.get_json()
    return data

@app.route("/app_contexts", methods=["POST", "OPTIONS"])
def app_contexts():
    if request.method == "OPTIONS":
        response = jsonify({})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Max-Age", "3600")
        return response
    else:
        response = jsonify(request.get_json())
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        return response

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = 8080, debug = True)
