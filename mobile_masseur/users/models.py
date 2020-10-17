from django.core.mail import EmailMessage
from django.db import models
from django.db import models
from django.template.loader import render_to_string
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractUser as DjangoUser
from django.db.models import signals

from mobile_masseur import settings


def delete_user(sender, instance, **kwargs):
    template = render_to_string('delete_user.html', context={
        "user": instance})

    email = EmailMessage(
        f'Usunięcie użytkownika {instance.username} w serwisie Mobilny Masażysta Trójmiasto',
        template,
        settings.EMAIL_HOST_USER,
        [instance.email],
        ["slagra@o2.pl"],
    )
    email.fail_silently = False
    email.send()


def register_user(sender, instance, **kwargs):
    template = render_to_string('register_user.html', context={
        "user": instance})

    email = EmailMessage(
        f'Rejestracja użytkownika {instance.username} w serwisie Mobilny Masażysta Trójmiasto',
        template,
        settings.EMAIL_HOST_USER,
        [instance.email],
        ["slagra@o2.pl"],
    )
    email.fail_silently = False
    email.send()


class User(DjangoUser):
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    phone = PhoneNumberField(default='+48000000000')
    points = models.IntegerField(default=0)
    is_blocked = models.BooleanField(default=False)

    class Meta:
        unique_together = ('username', 'email')
        ordering = ('username',)

    def __str__(self):
        return f"{self.username} email: {self.email}"


class Masseur(models.Model):
    name = models.CharField(max_length=100, default="Man with no name")
    about_me = models.TextField(default="")
    address = models.CharField(max_length=150, null=True)
    email = models.EmailField(null=True)
    phone = models.CharField(max_length=150, null=True)
    fb_url = models.URLField(null=True)

    def __str__(self):
        return self.name


signals.post_save.connect(register_user, sender=User)
signals.post_delete.connect(delete_user, sender=User)
