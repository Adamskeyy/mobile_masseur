from django.db import models
from model_utils import Choices


class MassageDateTime(models.Model):
    day = models.DateField()
    hour = models.TimeField()
    is_free = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.day} - {self.hour}"


b = MassageDateTime(day="2020-11-11", hour="12:00")
a = MassageDateTime(day="2020-11-11", hour="15:00")
FREE_DATES = Choices(
    (1, f"{a.day} + {a.hour}", f"{a.day} {a.hour}"),
    (2, f"{b.day} + {b.hour}", f"{b.day} {b.hour}"),
)


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
        return f"{self.name} - {self.duration} min - {self.cost} zł"

    class Meta:
        unique_together = ('name', 'duration', 'cost')
        ordering = ('name',)


class MassageService(models.Model):
    # FREE_DATES = [(x, x) for x in MassageDateTime.objects.all()]
    massage_type = models.ForeignKey(MassageType, on_delete=models.DO_NOTHING)
    massage_date = models.IntegerField(choices=FREE_DATES)
    comment = models.TextField(null=True, blank=True)
    massage_delivery = models.ForeignKey(MassageDelivery, on_delete=models.DO_NOTHING)
    address = models.CharField(max_length=200, blank=True, null=True)

    def total_cost(self):
        return self.massage_type.cost + self.massage_delivery.cost
