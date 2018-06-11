from django.db import models
from django.contrib.auth.models import User
from .person import *

#
#1. Every Doctor is also a patient and so are his kin
#   So create the Patient before creating the doctor

class Doctor(models.Model):
    specialization = models.CharField(max_length=64)

    def __str__(self):
        return ' ['+self.specialization+']'
