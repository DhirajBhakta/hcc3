from django.contrib import admin

from .models import trivial, drug, person, doctor, prescription
# Register your models here.
admin.site.register(person.Person)
admin.site.register(person.Guest)
admin.site.register(trivial.Department)
admin.site.register(trivial.Course)
admin.site.register(doctor.Doctor)
admin.site.register(drug.Drug)
admin.site.register(drug.Batch)
admin.site.register(prescription.Prescription)
# admin.site.register(doctor.DoctorPatientMap)
