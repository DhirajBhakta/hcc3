from django.db import models
from datetime import datetime


class LabReport(models.Model):
    patient = models.ForeignKey('Person', on_delete=models.CASCADE)
    doctor = models.ForeignKey('Doctor', on_delete=models.SET_NULL)
    date = models.DateTimeField(default=datetime.now, blank=True)
    done = models.BooleanField(default=False)
    blood_sugar_fasting = models.CharField(max_length=255, null=True, blank=True)
    blood_sugar_random = models.CharField(max_length=255, null=True, blank=True)
    blood_sugar_post_prandial = models.CharField(max_length=255, null=True, blank=True)
    serum_urea = models.CharField(max_length=255, null=True, blank=True)
    serum_creatinine = models.CharField(max_length=255, null=True, blank=True)
    serum_cholestrol = models.CharField(max_length=255, null=True, blank=True)
    HDL = models.CharField(max_length=255, null=True, blank=True)
    LDL = models.CharField(max_length=255, null=True, blank=True)
    TC_HDL = models.CharField(max_length=255, null=True, blank=True)
    triglycerides = models.CharField(max_length=255, null=True, blank=True)
    LFT_serum_protein = models.CharField(max_length=255, null=True, blank=True)
    LFT_serum_albumin = models.CharField(max_length=255, null=True, blank=True)
    LFT_serum_globulin = models.CharField(max_length=255, null=True, blank=True)
    LFT_A_G_ratio = models.CharField(max_length=255, null=True, blank=True)
    LFT_total_bilirubin = models.CharField(max_length=255, null=True, blank=True)
    LFT_direct_bilirubin = models.CharField(max_length=255, null=True, blank=True)
    LFT_indirect_bilirubin = models.CharField(max_length=255, null=True, blank=True)
    LFT_SGOT = models.CharField(max_length=255, null=True, blank=True)
    LFT_SGPT = models.CharField(max_length=255, null=True, blank=True)
    alkaline_phosphatase = models.CharField(max_length=255, null=True, blank=True)
    blood_group = models.CharField(max_length=255, null=True, blank=True)
    RH = models.CharField(max_length=255, null=True, blank=True)
    complete_hemogram = models.CharField(max_length=255, null=True, blank=True)
    ESR = models.CharField(max_length=255, null=True, blank=True)
    HB = models.CharField(max_length=255, null=True, blank=True)
    bleeding_time = models.CharField(max_length=255, null=True, blank=True)
    clotting_time = models.CharField(max_length=255, null=True, blank=True)
    blood_sugar_fasting_2 = models.CharField(max_length=255, null=True, blank=True)
    blood_sugar_post_prandial_2 = models.CharField(max_length=255, null=True, blank=True)
    blood_sugar_random_2 = models.CharField(max_length=255, null=True, blank=True)
    uric_acid = models.CharField(max_length=255, null=True, blank=True)
    MP = models.CharField(max_length=255, null=True, blank=True)
    widal = models.CharField(max_length=255, null=True, blank=True)
    albumin = models.CharField(max_length=255, null=True, blank=True)
    sugar = models.CharField(max_length=255, null=True, blank=True)
    bile_salts = models.CharField(max_length=255, null=True, blank=True)
    bile_pigments = models.CharField(max_length=255, null=True, blank=True)
    microscopy = models.CharField(max_length=255, null=True, blank=True)
    ova = models.CharField(max_length=255, null=True, blank=True)
    cyst = models.CharField(max_length=255, null=True, blank=True)