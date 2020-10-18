from django.core.mail import EmailMessage
from django.db import models
from django.db.models import signals
from django import forms
from django.forms import DateTimeField
from django.template.loader import render_to_string
from users.models import User
from datetime import datetime
from mobile_masseur import settings


def points_status(instance):
    extra_message = f"Aktualnie posiadasz {instance.owner.points} punktów."
    return extra_message


def send_email(instance, template, subject, cc, extra_message):
    message = extra_message
    total_cost = instance.massage_type.cost + instance.massage_delivery.cost
    template = render_to_string(template, context={
        "service": instance, "total_cost": total_cost, "extra_message": message})

    email = EmailMessage(
        subject,
        template,
        settings.EMAIL_HOST_USER,
        [instance.owner.email],
        [cc]
    )
    email.fail_silently = False
    email.send()


def add_points(sender, instance, **kwargs):
    if instance.has_taken_place:
        this_user = User.objects.filter(username=instance.owner.username)[0]
        this_user.points += instance.massage_type.points
        this_user.save()
        extra_message = ""
        if instance.owner.points >= 100:
            extra_message = "Zebrałeś ponad 100 pktów!!! Zadzwoń i umów się na masaż gratis!"
            this_user = User.objects.filter(username=instance.owner.username)[0]
            this_user.points -= 100
            this_user.save()
        send_email(instance=instance,
                   template="points_added.html",
                   subject=f"Gratulacje! Zdobyłeś {instance.massage_type.points} punktów",
                   cc="slagra@tlen.pl",
                   extra_message=extra_message)



def change_active_date(sender, instance, **kwargs):
    if instance.created and not instance.has_taken_place:
        instance.massage_date_time.is_active = False
        instance.massage_date_time.save()
        send_email(instance=instance, template='email_template.html',
                   subject=f'Rezerwacja masażu {instance.massage_type.duration} min termin: {instance.massage_date_time.date_time.strftime("%d.%m.%Y %H:%M")}',
                   cc="slagra@o2.pl",
                   extra_message=points_status(instance),
                   )


def change_inactive_date(sender, instance, **kwargs):
    if instance.created and not instance.has_taken_place:
        instance.massage_date_time.is_active = True
        instance.massage_date_time.save()
        send_email(instance=instance,
                   template='cancel_email_template.html',
                   subject=f'Odwołanie masażu {instance.massage_type.duration} min w terminie: {instance.massage_date_time.date_time.strftime("%d.%m.%Y %H:%M")}',
                   cc="slagra@o2.pl",
                   extra_message=points_status(instance),
                   )


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
    points = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return f"{self.name} - {self.duration} min"

    class Meta:
        unique_together = ('name', 'duration')
        ordering = ('name',)


class MassageService(models.Model):
    massage_type = models.ForeignKey(MassageType, on_delete=models.DO_NOTHING)
    massage_date_time = models.ForeignKey(MassageDateTime, on_delete=models.DO_NOTHING, unique=True)
    created = models.DateTimeField(auto_now_add=True, null=True)
    comment = models.TextField(null=True, blank=True)
    massage_delivery = models.ForeignKey(MassageDelivery, on_delete=models.DO_NOTHING)
    address = models.CharField(max_length=200, default="Gabinet Sopot Kamienny Potok")
    total_cost = models.IntegerField(default=0)
    has_taken_place = models.BooleanField(default=False, null=True, blank=True)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='services',
        null=True,
    )

    class Meta:
        ordering = ('massage_date_time',)

    def save(self, *args, **kwargs):
        self.total_cost = self.massage_delivery.cost + self.massage_type.cost
        super(MassageService, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.massage_type} / {self.massage_date_time} / {self.total_cost} zł {self.owner.username}"


signals.post_save.connect(add_points, sender=MassageService)
signals.post_save.connect(change_active_date, sender=MassageService)
signals.post_delete.connect(change_inactive_date, sender=MassageService)
