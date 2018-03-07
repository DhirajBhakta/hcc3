from django.db import models

from .drug import Drug
from .doctor import Doctor
from .person import Person


#Assumptions
# deleting a patient from the DB clears all his Prescriptions too

class Prescription(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True)
    patient = models.ForeignKey(Person, on_delete=models.SET_NULL, null=True)
    indication = models.CharField(max_length=255)
    date_time = models.DateTimeField(auto_now_add=True)


class PrescribedDrug(models.Model):
    prescription = models.ForeignKey(Prescription, on_delete=models.CASCADE, related_name='prescribed_drugs')
    drug = models.ForeignKey(Drug, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    comments = models.TextField()
