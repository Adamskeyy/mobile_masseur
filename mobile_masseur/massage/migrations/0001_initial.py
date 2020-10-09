# Generated by Django 3.1.2 on 2020-10-09 18:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MassageDateTime',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField()),
                ('is_free', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='MassageDelivery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('place', models.CharField(max_length=100)),
                ('cost', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='MassageType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('duration', models.IntegerField()),
                ('description', models.TextField(blank=True, null=True)),
                ('cost', models.IntegerField()),
            ],
            options={
                'ordering': ('name',),
                'unique_together': {('name', 'duration')},
            },
        ),
        migrations.CreateModel(
            name='MassageService',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField(blank=True, null=True)),
                ('address', models.CharField(blank=True, max_length=200, null=True)),
                ('massage_delivery', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='massage.massagedelivery')),
                ('massage_type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='massage.massagetype')),
            ],
        ),
    ]
