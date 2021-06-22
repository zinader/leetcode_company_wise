import pdftotext
import re
import json
    

json_objects = []

import os

path = './pdfs'

files = os.listdir(path)

list_companies = []

for f in files:
    list_companies.append(f.split('-')[0])
	
    

for j in list_companies:

    with open("./pdfs/" + j+ "- Leetcode.pdf", "rb") as f:
        pdf = pdftotext.PDF(f)

    # Iterate over all the pages
    for page in pdf:
        page = page.replace(" ", "")
        page = page.replace("\n", "")
        res = re.findall(r'\(.*?\)', page)

        for i in res:
            # print(i[:9])
            if(i[:9]=="(/problem" and "%" not in i):
                company_name = j[:-1]
                question_link = "https://leetcode.com" + i[1:-1]
                question_name = i[11:-1].title().replace("-"," ")
                
                a = {"Company_Name": company_name, "Link": question_link, "Name": question_name}
                
                
                json_objects.append(a)
                
json_object = json.dumps(json_objects)


  
with open("data.json", "w") as outfile:
    outfile.write(json_object)