from django.db import models

class Drug(models.Model):
    generic_name = models.CharField(max_length=255)
    trade_name = models.CharField(max_length=255)

    class Meta:
        unique_together = ('generic_name', 'trade_name')


class Batch(models.Model):
    #'batch' stands for 'batch_number' for consistency throughout the app
    drug = models.ForeignKey('Drug', on_delete=models.CASCADE, related_name='batches')
    batch = models.CharField(max_length=255)
    rack = models.IntegerField()
    quantity = models.IntegerField()
    expiry_date = models.DateField()




# class Store(models.Model):
#     rack = models.CharField(max_length=16)
#     quantity = models.IntegerField()
#     batch = models.ForeignKey('Batch', on_delete=models.CASCADE, related_name='stores')
