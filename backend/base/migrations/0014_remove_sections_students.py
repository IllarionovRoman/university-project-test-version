# Generated by Django 4.1.7 on 2023-05-31 08:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_alter_sections_trainers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sections',
            name='students',
        ),
    ]
