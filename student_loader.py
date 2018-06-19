import csv
import string
import requests
import json
import datetime
from random import *

genderDict={

}
departmentDICT={
"PHYSICS":"Physics",
"CHEMISTRY":"Chemistry",
"SCHOOL OF MANAGEMENT":"Humanities, Social Sciences and Management",
}

def genPasswd():
    characters = string.ascii_letters + string.digits
    return "".join(choice(characters) for x in range(8))

def trailingcutter(row):
    enditem = row.pop()
    while(enditem==''):
        enditem = row.pop()
    row.append(enditem)
    return row


csv_data = csv.reader(open('HCC_STU.csv',errors='replace'))
username_password = open("student_username_password.txt","w")
failed_students = open("failed_students.txt","w")

firstline = True
line = 0
for row in csv_data:
    line = line +1
    print(line)

    if(firstline):
        firstline = False
        continue
    rowdata = trailingcutter(row)
    if(len(rowdata) <3):
        continue
    rollno = rowdata[1]
    passwd = genPasswd()
    name = rowdata[2]
    dob = rowdata[3]
    gender = rowdata[4]
    blood_group = rowdata[5]
    permanent_address = " ,".join(rowdata[6:-6])

    course = rowdata[-1]
    department = rowdata[-2]
    emailID = rowdata[-4]
    guardian_phone = rowdata[-5]
    phone = rowdata[-6]


    r = requests.post("http://localhost:8000/api/users/", data=
    {
     'username': rollno,
     'password': passwd,
     'group': "PATIENT"
     })
    print(r.status_code, r.reason)
    if(r.status_code == 201):
        print("user success for ",rollno,name)
        personInfo = dict()
        if(department):
            personInfo['department'] = department
        personInfo['gender'] = gender
        personInfo['patient_type'] = 'STUDENT'
        personInfo['name'] = name
        if(dob):
            personInfo['date_of_birth'] = dob
        if(phone):
            personInfo['phone'] = phone
        if(guardian_phone):
            personInfo['guardian_phone'] = guardian_phone
        if(permanent_address):
            personInfo['permanent_address'] = permanent_address
        personInfo['user'] = json.loads(r.text)["id"]
        r2 = requests.post("http://localhost:8000/api/persons/", data=personInfo)
        print(r2.status_code, r2.reason)
        if(r2.status_code == 201):
            print("person success for ",rollno,name)
        else:
            failed_students.write("\nFAILED PERSON:"+rollno+" "+name)
        username_password.write("\n%s,%s,%s" %(rollno,name,passwd))
        print('password recorded')
    else:
        print("user entry failed,")

        failed_students.write("\nFAILED USER:"+rollno+" "+name)





username_password.close()
print("CSV has been imported into the database")
