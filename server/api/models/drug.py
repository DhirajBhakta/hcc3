from django.db import models


#generic_names are lowercase.(eg:ranitidine)
#trade_names are ALL_CAPS. (eg:ZANTAC)
class Drug(models.Model):
    generic_name = models.CharField(max_length=255)
    trade_name = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        self.generic_name = self.generic_name.lower()
        self.trade_name = self.trade_name.upper()
        return super(Drug, self).save(*args, **kwargs)

    def __str__(self):
        return self.trade_name+' ('+self.generic_name+')'



#'batch' stands for 'batch_number' for consistency throughout the app
class Batch(models.Model):
    drug = models.ForeignKey('Drug', on_delete=models.CASCADE, related_name='batches')
    batch = models.CharField(max_length=255)  # TODO: Change the name to batch_name or something
    rack = models.IntegerField()
    quantity = models.IntegerField()
    expiry_date = models.DateField()

    def __str__(self):
        return self.batch+'('+self.drug.__str__()+')'+str(self.quantity)




# class Store(models.Model):
#     rack = models.CharField(max_length=16)
#     quantity = models.IntegerField()
#     batch = models.ForeignKey('Batch', on_delete=models.CASCADE, related_name='stores')
