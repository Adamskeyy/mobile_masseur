from django.db import models
from django.db.models import signals
from model_utils import Choices

from users.models import User


# from django.contrib.auth.models import User


class MassageDateTime(models.Model):
    date_time = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        if self.is_active:
            availability = "termin dostępny"
        else:
            availability = "termin niedostępny"
        return f"{self.date_time} - {availability}"


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
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.duration} min"

    class Meta:
        unique_together = ('name', 'duration')
        ordering = ('name',)


class MassageService(models.Model):
    massage_type = models.ForeignKey(MassageType, on_delete=models.DO_NOTHING, null=True)
    massage_date_time = models.ForeignKey(MassageDateTime, on_delete=models.DO_NOTHING, null=True)
    comment = models.TextField(null=True, blank=True)
    massage_delivery = models.ForeignKey(MassageDelivery, on_delete=models.DO_NOTHING, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user',
        null=True,
    )

    # def your_callable_function(sender, instance, **kwargs):
    #
    # # do something, create other model instances, etc
    #
    # signals.post_save.connect(your_callable_function, sender=Message)

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