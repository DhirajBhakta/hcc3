from django.db import models

class PatientHistory(models.Model):
    doctor = models.ForeignKey('Doctor', on_delete=models.SET_NULL, related_name='treatment_history')
    patient = models.ForeignKey('Person', on_delete=models.CASCADE, related_name='patient_history')
    indication = models.CharField(max_length=255)
    #..add future fields here , PRESCRIPTION, MEDICAL DIARY..
