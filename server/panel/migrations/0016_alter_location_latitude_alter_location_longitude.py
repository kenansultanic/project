# Generated by Django 4.2.4 on 2023-09-15 18:15

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('panel', '0015_alter_publictransportline_departure_for'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='latitude',
            field=models.FloatField(validators=[django.core.validators.MinValueValidator(limit_value=-90.0, message='Latitude must be greater than or equal to -90.0'), django.core.validators.MaxValueValidator(limit_value=90.0, message='Latitude must be less than or equal to 90.0')]),
        ),
        migrations.AlterField(
            model_name='location',
            name='longitude',
            field=models.FloatField(validators=[django.core.validators.MinValueValidator(limit_value=-180.0, message='Longitude must be greater than or equal to -180.0'), django.core.validators.MaxValueValidator(limit_value=180.0, message='Longitude must be less than or equal to 180.0')]),
        ),
    ]