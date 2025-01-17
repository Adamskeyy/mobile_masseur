# Generated by Django 3.1.2 on 2020-10-10 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_masseur'),
    ]

    operations = [
        migrations.AddField(
            model_name='masseur',
            name='address',
            field=models.CharField(max_length=150, null=True),
        ),
        migrations.AddField(
            model_name='masseur',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='masseur',
            name='fb_url',
            field=models.URLField(null=True),
        ),
        migrations.AddField(
            model_name='masseur',
            name='phone',
            field=models.CharField(max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='masseur',
            name='about_me',
            field=models.TextField(default=''),
        ),
    ]
