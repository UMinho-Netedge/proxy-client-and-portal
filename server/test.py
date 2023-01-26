from flask import Flask, request
import requests

app = Flask(__name__)

@app.route("/callback_ref", methods=["POST"])
def handle_post():
    data = request.get_json()
    response = requests.post("http://127.0.0.1:5005/callback_ref", json=data)
    return {"code":"code"}, response.status_code

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = 5001, debug = True)