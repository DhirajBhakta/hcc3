import csv
import string
import requests
import json
import datetime

def parse_date(text):
    for fmt in ('%m/%d/%Y', '%d-%m-%Y'):
        try:
            return datetime.datetime.strptime(text, fmt)
        except ValueError:
            pass
    raise ValueError('no valid date format found')


csv_data = csv.reader(open('HCC_DEP.csv'))
failed_file = open("Failed_dependants",'w')
failed = []


firstline = True
for row in csv_data:
    if(firstline):
        firstline = False
        continue
    rowdata = row
    empID = rowdata[0][:-1]#last character is irrelavant
    name = rowdata[1]
    dob = rowdata[2]

    personInfo = dict()
    personInfo['patient_type'] = 'DEPENDANT'
    personInfo['name'] = name
    personInfo['gender'] = None
    if(dob):
        dob = parse_date(dob)
        dob = dob.strftime("%Y-%m-%d")
        personInfo['date_of_birth'] = dob
    r = requests.get('http://localhost:8000/api/users/'+empID+'/')
    print('GET PATRON ID',r.status_code, r.reason)
    if(r.status_code == 200):
        personInfo['patron'] = json.loads(r.text)["person"]["id"]
        r2 = requests.post('http://localhost:8000/api/persons/',personInfo)
        print('POST DEPENDANT',r2.status_code,r2.reason, r2.text)
        if(r2.status_code==201):
            print(name," add person success")
    else:
        failed.append(name)
        print(name,"failed")

print(failed)
failed_file.write(json.dumps(failed))
