# Generated by Django 4.1.7 on 2023-05-30 21:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_event_address_event_students'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='students',
        ),
        migrations.AddField(
            model_name='event',
            name='students',
            field=models.ManyToManyField(to='base.students'),
        ),
    ]
