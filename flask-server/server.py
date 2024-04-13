from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # 모든 origin에서 오는 요청을 허용합니다.

@app.route("/runAlgorithm")
# def runAlgorithm():
#     return {"Algorithm1": ["A1", "A2", "A3"]}

def get_data():
    with open("Target_Function.json", "r") as file:
        data = json.load(file)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
