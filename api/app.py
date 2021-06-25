import pdftotext
import re
import json
import os
    
json_objects = []
path = './pdfs'
files = os.listdir(path)

list_companies = []

for f in files:
    list_companies.append(f.split('-')[0])
	

for j in list_companies:

    with open("./pdfs/" + j+ "- Leetcode.pdf", "rb") as f:
        pdf = pdftotext.PDF(f)
    
    res = []

    # Iterate over all the pages
    for page in pdf:
        
        page = page.replace(" ", "")
        
        for i in page.split():
            if("Medium" in i or "Easy" in i or "Hard" in i):
                
                
                resEasy = re.findall(r'\(.*?\Easy', i)
                resMedium = re.findall(r'\(.*?\Medium', i)
                resHard = re.findall(r'\(.*?\Hard', i)
            
                res.append(resEasy)
                res.append(resMedium)
                res.append(resHard)
                    
    res = filter(None, res)
     
    for i in res:
        
        if(i[0][0:6]=="(/prob" and ")" in i[0]):

            company_name = j[:-1]

            res2 = re.findall(r'\(.*?\)', i[0])
            res3 = re.findall(r'\).*?\%', i[0])
            res4 = re.findall(r'\%.*', i[0])
            
            if(len(res2)!=0):
                
                question_link = "https://leetcode.com" + res2[0][1:-1]
                question_name = res2[0][11:-1].title().replace("-"," ")
                
            if(len(res3)!=0):
                
                question_difficulty_percentage = res3[0][1:]
                
            if(len(res4)!=0):
                
                question_difficulty = res4[0][1:]
            
            string_encode = question_difficulty_percentage.encode("ascii", "ignore")
            string_decode = string_encode.decode()

            a = {"Company_Name": company_name, "Link": question_link, "Name": question_name, "Percentage":string_decode,"Difficulty":question_difficulty}

            
            json_objects.append(a)
            
         
json_object = json.dumps(json_objects)

  
with open("data.json", "w") as outfile:
    outfile.write(json_object)
    

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