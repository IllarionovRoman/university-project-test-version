# Generated by Django 4.1.7 on 2023-05-31 08:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_podevent'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sections',
            old_name='student',
            new_name='students',
        ),
    ]