import json


all_questions = []
with open('data.json') as data_file:
    all_questions = json.load(data_file)

list_companies = []

for i in all_questions:
    list_companies.append(i["Company_Name"])

list_companies = list(dict.fromkeys(list_companies))
list_companies.sort()


with open('companies.json', 'w') as f:
    f.write(json.dumps(list_companies, ensure_ascii=False))


