# Generated by Django 4.1.7 on 2023-05-30 21:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_product_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='address',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='students',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='base.students'),
            preserve_default=False,
        ),
    ]
