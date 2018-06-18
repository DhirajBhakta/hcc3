import csv
import string
import requests
import json
import datetime
from random import *


departmentDICT={
"CIVIL":"Civil Engineering",
"APPLIED MECHANICS":"Applied Mechanics",
"ELECTRIAL":"Electrical and Electronics Engineering",
"E&C":"Electronics and Communication Engineering",
"MECHANICAL":"Mechanical Engineering",
"METALLURGY":"Metallurgical and Materials Engineering",
"CHEMICAL":"Chemical Engineering",
"MINING":"Mining Engineering",
"COMPUTER":"Computer Science and Engineering",
"CENTRAL COMP.CENTRE":"Central Computer Center",
"MACS":"Mathematical and Computational Sciences",
"PHYSICS":"Physics",
"CHEMISTRY":"Chemistry",
"SCHOOL OF MANAGEMENT":"Humanities, Social Sciences and Management",
"PHYSICAL EDUCATION":"Sports Section",
"INFORMATION TECH.":"Information Technology",
"INFORMATION TECH":"Information Technology",
"ADMN.OFFICE":"Administrative Office",
"LIBRARY":"Central Library",
"RE OFFICE":"Resident Engineers Office",
"HOSTEL OFFICE":"Hostel Office",
"HOSTEL":"Hostel Office",
"GUEST HOUSE":"Guest House",
"WATCH & WARD OFFICE":"Security",
"CASH SECTION":"Cash Section",
"DISPENSARY":"Health Care Center",
"PLACEMENT & TRAINING":"Placement and Training"
}

def genPasswd():
    characters = string.ascii_letters + string.digits
    return "".join(choice(characters) for x in range(8))



csv_data = csv.reader(open('HCC_EMP.csv'))
username_password = open("employee_username_password.txt","w")

firstline = True
for row in csv_data:
    if(firstline):
        firstline = False
        continue
    rowdata = ''.join(row).split(';');

    empID = rowdata[0][:-1]#last character is always 0 (patron)
    passwd = genPasswd()
    name = rowdata[1]
    department = rowdata[2]
    designation = rowdata[3]
    dob = rowdata[4]
    gender = rowdata[5]
    phone = rowdata[6]
    local_address = rowdata[7]




    r = requests.post("http://localhost:8000/api/users/", data=
    {
     'username': empID,
     'password': passwd,
     'group': "PATIENT"
     })
    print(r.status_code, r.reason)
    if(r.status_code == 201):
        print("user success for ",empID,name)
        personInfo = dict()
        if department in departmentDICT:
            personInfo['department'] = departmentDICT[department]
        personInfo['gender'] = gender
        personInfo['patient_type'] = 'EMPLOYEE'
        personInfo['name'] = name
        if(designation):
            personInfo['designation'] = designation
        if(dob):
            dob = datetime.datetime.strptime(dob,"%m/%d/%Y")
            dob = dob.strftime("%Y-%m-%d")
            personInfo['date_of_birth'] = dob
        if(phone):
            personInfo['phone'] = phone
        if(local_address):
            personInfo['local_address'] = local_address
        personInfo['retired'] = False
        personInfo['user'] = json.loads(r.text)["id"]
        r2 = requests.post("http://localhost:8000/api/persons/", data=personInfo)
        print(r2.status_code, r2.reason)
        if(r2.status_code == 201):
            print("person success for ",empID,name)
        username_password.write("\n%s,%s,%s" %(empID,name,passwd))



username_password.close()
print("CSV has been imported into the database")
