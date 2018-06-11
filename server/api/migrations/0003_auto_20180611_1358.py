# Generated by Django 2.0.1 on 2018-06-11 13:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20180611_0808'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='doctor',
            name='person',
        ),
        migrations.AddField(
            model_name='person',
            name='doctor',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='person', to='api.Doctor'),
        ),
    ]
