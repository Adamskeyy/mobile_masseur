# Generated by Django 3.1.2 on 2020-10-11 11:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20201010_1555'),
    ]

    operations = [
        migrations.AddField(
            model_name='masseur',
            name='name',
            field=models.CharField(default='Man with no name', max_length=100),
        ),
    ]
