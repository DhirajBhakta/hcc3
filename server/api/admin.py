from django.contrib import admin

from .models import trivial, person, doctor
# Register your models here.
admin.site.register(person.Person)
admin.site.register(person.Guest)
admin.site.register(trivial.Department)
admin.site.register(trivial.Course)
admin.site.register(doctor.Doctor)
