from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
CORS(app, support_credentials=True)


import os

path = './pdfs'

files = os.listdir(path)

list_companies = []

for f in files:
    list_companies.append(f.split('-')[0][0:-1])
    

@app.route('/companies')
def getCompanies():
    return jsonify(
        data=list_companies
    )



@app.route('/')
def hello_world():
    return 'Hello, World!'


# @app.route('/leetcode', methods=['GET'])
# def getLeetcode():
#     all_questions = []
#     with open('data.json') as data_file:
#         all_questions = json.load(data_file)

#     return jsonify(
#         data=all_questions
#     )


@app.route('/companies/<company>', methods=['GET'])
def getMLH(company):
    all_questions = []
    with open('data.json') as data_file:
        all_questions = json.load(data_file)

    return jsonify(
        data=[question for question in all_questions if question["Company_Name"] == company]
    )


if __name__ == "__main__":
    app.run()
