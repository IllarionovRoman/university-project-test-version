# Generated by Django 4.1.7 on 2023-05-27 21:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_departments_sections_students_trainers_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='departments',
            name='material',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='departments',
            name='qty',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]