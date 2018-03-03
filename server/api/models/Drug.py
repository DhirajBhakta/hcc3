from django.db import models

class Drug(models.Model):
    generic_name = models.CharField(max_length=255)
    trade_name = models.CharField(max_length=255)
    
    class Meta:
        unique_together = (('generic_name', 'trade_name'),)


class Batch(models.Model):
    name = models.CharField(max_length=255)
    expiry_date = models.DateField()
    drug = models.ForeignKey('Drug', on_delete=models.CASCADE, related_name='batches')

class Store(models.Model):
    rack = models.CharField(max_length=16)
    quantity = models.IntegerField()
    batch = models.ForeignKey('Batch', on_delete=models.CASCADE, related_name='stores')
