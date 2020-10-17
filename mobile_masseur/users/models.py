from django.db import models
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractUser as DjangoUser


# class Admin(models.Model):
#     email = models.EmailField(max_length=100, unique=True, default="slagra@tlen.pl")
#     phone = PhoneNumberField(default='+48666617008')


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