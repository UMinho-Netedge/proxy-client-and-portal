from flask import Flask, request, make_response, jsonify
import requests
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/app_contexts", methods=[, 'POST', 'OPTIONS'])
def handle_post():
    body = request.get_json()
    return body

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = 5001, debug = True)
