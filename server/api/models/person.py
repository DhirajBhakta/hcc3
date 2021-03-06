from django.db import models
from django.contrib.auth.models import User

from .trivial import Department, Course


PATIENT_TYPE_CHOICES =(
  ('S','STUDENT'),
  ('E','EMPLOYEE'),
  ('D','DEPENDANT'),
)


GENDER_CHOICES = (
    ('M','MALE'),
    ('F','FEMALE'),
    ('O','OTHER'),
)

BLOOD_GROUP_CHOICES = (
    ('A+','A+'),
    ('A-','A-'),
    ('B+','B+'),
    ('B-','B-'),
    ('AB+','AB+'),
    ('AB-','AB-'),
    ('O+','O+'),
    ('O-','O-'),
)


#Temporary protocols
# 1. replicate phone to guardian_phone if not supplied
# 2. replicate local_address to permanent_address if not supplied
# 3. email MUST be compulsory. Provide NITK HCC email if not supplied.
# 4. 'user' field is a reference to django's built in User model. We're delegating
#    authentication and user management to it. (very safe and easy)
#    ROLL NUMBER and EMPLOYEE ID will be stored as 'username' in User table
#    Dependants will have user=NULL, as they authenticate through their patron's credentials
#   So, all 'Patients' are Users except Dependants
#   email will also be stored in User table



class Person(models.Model):
    #common fields
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='person')
    name = models.CharField(max_length=255)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES,null=True, blank=True)
    phone = models.CharField(max_length=15,null=True, blank=True)
    guardian_phone = models.CharField(max_length=15, blank=True, null=True)
    local_address = models.TextField(null=True, blank=True)
    permanent_address = models.TextField(null=True, blank=True)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES,null=True, blank=True)
    patient_type = models.CharField(max_length=1, choices=PATIENT_TYPE_CHOICES,null=True, blank=True)
    #optional fields
    #(SPARSE columns are nicely handled by InnoDB. don't freak out)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True)
    retired = models.NullBooleanField(default=False, null=True)
    designation = models.CharField(max_length=255, null=True, blank=True)
    patron = models.ForeignKey("self",on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name + ' ('+self.patient_type+')'

class Guest( models.Model):
    name = models.CharField(max_length=255)
