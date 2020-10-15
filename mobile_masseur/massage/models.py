from django.core.mail import EmailMessage
from django.db import models
from django.db.models import signals
from django import forms
from django.forms import DateTimeField
from django.template.loader import render_to_string
from users.models import User
from datetime import datetime
from mobile_masseur import settings


def cancel(instance):
    total_cost = instance.massage_type.cost + instance.massage_delivery.cost
    template = render_to_string('cancel_email_template.html', context={
                                "service": instance, "total_cost": total_cost})

    email = EmailMessage(
        f'Odwołanie masażu {instance.massage_type.duration} min w terminie: {instance.massage_date_time.date_time.strftime("%d.%m.%Y %H:%M")}',
        template,
        settings.EMAIL_HOST_USER,
        [instance.owner.email],
        ["slagra@o2.pl"]
    )
    email.fail_silently = False
    email.send()


def success(instance):
    total_cost = instance.massage_type.cost + instance.massage_delivery.cost
    template = render_to_string('email_template.html', context={
                                "service": instance, "total_cost": total_cost})

    email = EmailMessage(
        f'Rezerwacja masażu {instance.massage_type.duration} min termin: {instance.massage_date_time.date_time.strftime("%d.%m.%Y %H:%M")}',
        template,
        settings.EMAIL_HOST_USER,
        [instance.owner.email],
        ["slagra@o2.pl"],
    )
    email.fail_silently = False
    email.send()


class MassageDateTime(models.Model):
    date_time = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ('date_time', 'is_active')

    def __str__(self):
        if self.is_active:
            availability = "termin dostępny"
        else:
            availability = "termin niedostępny"
        return f"{self.date_time.strftime('%Y-%m-%d %H:%M')} - {availability}"


class MassageDelivery(models.Model):
    place = models.CharField(
        max_length=100, default="Gabinet Sopot Kamienny Potok")
    cost = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.place} - {self.cost} zł"


class MassageType(models.Model):
    name = models.CharField(max_length=100)
    duration = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    cost = models.IntegerField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.duration} min"

    class Meta:
        unique_together = ('name', 'duration')
        ordering = ('name',)


def change_active_date(sender, instance, **kwargs):
    if instance.created:
        instance.massage_date_time.is_active = False
        instance.massage_date_time.save()
        success(instance)


def change_inactive_date(sender, instance, **kwargs):
    if instance.created:
        instance.massage_date_time.is_active = True
        instance.massage_date_time.save()
        cancel(instance)


class MassageService(models.Model):
    massage_type = models.ForeignKey(
        MassageType, on_delete=models.DO_NOTHING, null=True)
    massage_date_time = models.ForeignKey(
        MassageDateTime, on_delete=models.DO_NOTHING, null=True)
    created = models.DateTimeField(auto_now_add=True, null=True)
    comment = models.TextField(null=True, blank=True)
    massage_delivery = models.ForeignKey(
        MassageDelivery, on_delete=models.DO_NOTHING, null=True)
    address = models.CharField(
        max_length=200, blank=True, null=True, default="Gabinet Sopot Kamienny Potok")
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user',
        null=True,
    )

    class Meta:
        ordering = ('massage_date_time',)

    def total_cost(self):
        return self.massage_type.cost + self.massage_delivery.cost

    def __str__(self):
        return f"{self.massage_type} / {self.massage_date_time} / {self.total_cost()} zł"


signals.post_save.connect(change_active_date, sender=MassageService)
signals.post_delete.connect(change_inactive_date, sender=MassageService)
