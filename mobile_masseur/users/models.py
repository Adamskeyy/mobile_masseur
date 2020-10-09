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

    def get_massage_history(self):
        pass

    def get_massage_plan(self):
        pass

    class Meta:
        unique_together = ('username', 'email')
        ordering = ('username',)

    def __str__(self):
        return f"{self.username} email: {self.email}"
