from django.db import models


class LabReport(models.Model):
    patient = models.ForeignKey('Person', on_delete=models.CASCADE)
    doctor = models.ForeignKey('Doctor', on_delete=models.SET_NULL)
    done = models.BooleanField(default=False)
    bloodGroup = models.CharField(max_length=255, null=True, blank=True)
    RH = models.CharField(max_length=255, null=True, blank=True)
    completeHemogram = models.CharField(max_length=255, null=True, blank=True)
    ESR = models.CharField(max_length=255, null=True, blank=True)
    HB = models.CharField(max_length=255, null=True, blank=True)
    bleedingTime = models.CharField(max_length=255, null=True, blank=True)
    clottingTime = models.CharField(max_length=255, null=True, blank=True)
    bloodSugarFasting = models.CharField(max_length=255, null=True, blank=True)
    bloodSugarPostPrandial = models.CharField(max_length=255, null=True, blank=True)
    bloodSugarRandom = models.CharField(max_length=255, null=True, blank=True)
    uricAcid = models.CharField(max_length=255, null=True, blank=True)
    MP = models.CharField(max_length=255, null=True, blank=True)
    widal = models.CharField(max_length=255, null=True, blank=True)
    sugar = models.CharField(max_length=255, null=True, blank=True)
    albumin = models.CharField(max_length=255, null=True, blank=True)
    bileSalts = models.CharField(max_length=255, null=True, blank=True)
    bilePigments = models.CharField(max_length=255, null=True, blank=True)
    microscopy = models.CharField(max_length=255, null=True, blank=True)
    ova = models.CharField(max_length=255, null=True, blank=True)
    cyst = models.CharField(max_length=255, null=True, blank=True)
    bloodSugarFasting2 = models.CharField(max_length=255, null=True, blank=True)
    bloodSugarRandom2 = models.CharField(max_length=255, null=True, blank=True)
    bloodSugarPostPrandial2 = models.CharField(max_length=255, null=True, blank=True)
    serumUrea = models.CharField(max_length=255, null=True, blank=True)
    serumCreatinine = models.CharField(max_length=255, null=True, blank=True)
    serumCholestrol = models.CharField(max_length=255, null=True, blank=True)
    HDL = models.CharField(max_length=255, null=True, blank=True)
    LDL = models.CharField(max_length=255, null=True, blank=True)
    TC_HDL = models.CharField(max_length=255, null=True, blank=True)
    triglycerides = models.CharField(max_length=255, null=True, blank=True)
    LFTSerumProtein = models.CharField(max_length=255, null=True, blank=True)
    LFTSerumAlbumin = models.CharField(max_length=255, null=True, blank=True)
    LFTSerumGlobulin = models.CharField(max_length=255, null=True, blank=True)
