from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from .prescription import Prescription
from .drug import Batch

STATUSES = (
    ('S','SENT'),
    ('N','UNSENT'),
    ('A','ACKNOWLEDGED'),
)


class PharmaRecord(models.Model):
    prescription = models.ForeignKey(Prescription, on_delete=models.CASCADE)
    status = models.CharField(max_length=1, choices=STATUSES, default='N')


@receiver(post_save, sender=Prescription)
def create_pharmarecord(sender, instance, created, **kwargs):
    print(sender,instance,created)
    if created:
        record = PharmaRecord.objects.create(prescription=instance)
        print("Created pharma record ",record)


class DispensedDrug(models.Model):
    batch = models.ForeignKey(Batch, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField()
    pharmarecord = models.ForeignKey(PharmaRecord, on_delete=models.CASCADE, related_name="dispensed_drugs")

    class Meta:
        unique_together = (("batch", "pharmarecord"),)
