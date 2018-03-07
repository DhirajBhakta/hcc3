from .prescription import Prescription
from .drug import Batch
from django.db import models

STATUSES = (
    ('S','SENT'),
    ('N','UNSENT'),
    ('A','ACKNOWLEDGED'),
)

class PharmaRecord(models.Model):
    prescription = models.ForeignKey(Prescription, on_delete=models.CASCADE)

class PharmaRecordBuffer(models.Model):
    record = models.ForeignKey(PharmaRecord, on_delete=models.CASCADE) 
    status = models.CharField(max_length=1, choices=STATUSES)

class DispensedDrug(models.Model):
    batch = models.ForeignKey(Batch, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField()
    record = models.ForeignKey(PharmaRecord, on_delete=models.CASCADE, related_name="dispensed_drugs")

    class Meta:
        unique_together = (("batch", "record"),)
