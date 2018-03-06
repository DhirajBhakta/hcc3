from django.db import models


class Department(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class Course(models.Model):
    name = models.CharField(max_length=16)

    def __str__(self):
        return self.name
