from django.contrib import admin

from .models import trivial, drug, person
# Register your models here.
admin.site.register(person.Person)
admin.site.register(trivial.Department)
admin.site.register(trivial.Course)
