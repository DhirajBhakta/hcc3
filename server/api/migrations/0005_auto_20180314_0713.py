# Generated by Django 2.0.1 on 2018-03-14 07:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20180312_2134'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctor',
            name='person',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.Person'),
        ),
    ]
