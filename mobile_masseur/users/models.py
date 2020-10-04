from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    phone = PhoneNumberField(default='+48000000000')

    class Meta:
        unique_together = ('name', 'phone')
        ordering = ('name',)

    def __str__(self):
        return f"{self.name} email: {self.email}"
