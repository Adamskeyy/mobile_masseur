from django.db import models
from model_utils import Choices

from users.models import User


class MassageDateTime(models.Model):
    day = models.DateField()
    hour = models.TimeField()
    is_free = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.day} - {self.hour}"


class MassageDelivery(models.Model):
    place = models.CharField(max_length=100)
    cost = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.place} - {self.cost} zł"


class MassageType(models.Model):
    name = models.CharField(max_length=100)
    duration = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    cost = models.IntegerField()

    def __str__(self):
        return f"{self.name} - {self.duration} min"

    class Meta:
        unique_together = ('name', 'duration')
        ordering = ('name',)


class MassageService(models.Model):
    massage_type = models.ForeignKey(MassageType, on_delete=models.DO_NOTHING)
    massage_date_time = models.CharField(
        max_length=200,
        choices=[(str(free_date), str(free_date)) for free_date in MassageDateTime.objects.all()],
    )
    comment = models.TextField(null=True, blank=True)
    massage_delivery = models.ForeignKey(MassageDelivery, on_delete=models.DO_NOTHING)
    address = models.CharField(max_length=200, blank=True, null=True)
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

    def get_all_history(self):
        pass

    def get_massage_plan(self):
        pass

    def __str__(self):
        return f"{self.massage_type} / {self.massage_date_time} / {self.total_cost()} zł"
