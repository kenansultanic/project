# Generated by Django 4.1.7 on 2023-09-30 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('panel', '0002_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='destination',
            name='image',
        ),
        migrations.AddField(
            model_name='destination',
            name='image',
            field=models.ManyToManyField(to='panel.image'),
        ),
    ]