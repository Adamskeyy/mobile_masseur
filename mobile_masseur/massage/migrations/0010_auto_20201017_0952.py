# Generated by Django 3.1.2 on 2020-10-17 07:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('massage', '0009_auto_20201014_2103'),
    ]

    operations = [
        migrations.AlterField(
            model_name='massageservice',
            name='address',
            field=models.CharField(default='Gabinet Sopot Kamienny Potok', max_length=200),
        ),
        migrations.AlterField(
            model_name='massageservice',
            name='massage_date_time',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.DO_NOTHING, to='massage.massagedatetime'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='massageservice',
            name='massage_delivery',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='massage.massagedelivery'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='massageservice',
            name='massage_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='massage.massagetype'),
            preserve_default=False,
        ),
    ]
