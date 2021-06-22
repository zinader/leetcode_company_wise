from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
CORS(app, support_credentials=True)

all_questions = []
with open('data.json') as data_file:
    all_questions = json.load(data_file)

list_companies = []

for i in all_questions:

    list_companies.append(i["Company_Name"])

list_companies = list(dict.fromkeys(list_companies))
list_companies.sort()


@app.route('/companies')
def getCompanies():
    
    return jsonify(
        data=list_companies
    )



@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/companies/<company>', methods=['GET'])
def getMLH(company):
    
    return jsonify(
        data=[question for question in all_questions if question["Company_Name"] == company]
    )


if __name__ == "__main__":
    app.run()
