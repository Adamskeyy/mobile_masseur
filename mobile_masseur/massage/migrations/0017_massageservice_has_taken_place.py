# Generated by Django 3.1.2 on 2020-10-18 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('massage', '0016_merge_20201018_0905'),
    ]

    operations = [
        migrations.AddField(
            model_name='massageservice',
            name='has_taken_place',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
