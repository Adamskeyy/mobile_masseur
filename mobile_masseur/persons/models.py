from django.db import models
from users.models import User
from massage.models import MassageService


class Person(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(
        User, related_name="persons", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
