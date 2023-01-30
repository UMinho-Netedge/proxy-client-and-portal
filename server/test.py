from flask import Flask, request
import requests

app = Flask(__name__)

@app.route("/")
def hello():
    return {"status":"ok"}

@app.route("/callback_ref", methods=["POST"])
def handle_post():
    data = request.get_json()
    return data

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = 5001, debug = True)