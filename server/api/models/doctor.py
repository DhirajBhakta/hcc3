from django.db import models
from .person import Person

#
#1. Every Doctor is also a patient and so are his kin
#   So create the Patient before creating the doctor

class Doctor(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=64)
