# Generated by Django 3.2.9 on 2021-12-04 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images_generator', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candymachine',
            name='start_date',
            field=models.TextField(blank=True),
        ),
    ]