from django.db import models
from django.contrib.auth.models import User
from .person import Person

#
#1. Every Doctor is also a patient and so are his kin
#   So create the Patient before creating the doctor

class Doctor(models.Model):
    person = models.OneToOneField(Person, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=64)

    def __str__(self):
        return self.person.name+' ['+self.specialization+']'

class DoctorPatientMap(models.Model): 
    '''
     This is a functional database for the reception's greeter functionality. 
     It creates a mapping from doctors to patients. This db is used to show waiting room 
     of patients to the doctor to proceed to diagnosis
    '''

    patient = models.ForeignKey(User, on_delete = models.CASCADE, related_name='patient')
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='doctor')

    class Meta:

        unique_together = (('patient', 'doctor'),)