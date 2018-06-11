# Generated by Django 2.0.1 on 2018-06-11 08:08

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='doctorpatientmap',
            old_name='doctors',
            new_name='doctor',
        ),
        migrations.AlterUniqueTogether(
            name='doctorpatientmap',
            unique_together={('patient', 'doctor')},
        ),
    ]
