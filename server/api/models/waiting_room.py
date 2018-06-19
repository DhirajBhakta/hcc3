from django.db import models


class WaitingRoom(models.Model):
    doctor = models.ForeignKey('Doctor',on_delete=models.CASCADE)
    patient = models.ForeignKey('Person',on_delete=models.CASCADE, null=True, blank=True)
    guest = models.ForeignKey('Guest',on_delete=models.CASCADE, null=True, blank=True)
    token = models.IntegerField()
