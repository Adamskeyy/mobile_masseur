# Generated by Django 3.1.2 on 2020-10-10 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('massage', '0003_auto_20201009_2049'),
    ]

    operations = [
        migrations.AddField(
            model_name='massagetype',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]