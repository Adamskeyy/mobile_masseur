from rest_framework import serializers
from massage.models import MassageService, MassageType, MassageDateTime, MassageDelivery

from mobile_masseur import settings


class MassageServiceSerializer(serializers.ModelSerializer):
    massage_type = serializers.ReadOnlyField(source='massage_type.name')
    massage_date_time = serializers.DateTimeField(format=settings.DATETIME_FORMAT, input_formats=None,
                                                  source='massage_date_time.date_time')
    created = serializers.DateTimeField(format=settings.DATETIME_FORMAT, input_formats=None)
    massage_delivery = serializers.ReadOnlyField(source='massage_delivery.place')
    owner = serializers.ReadOnlyField(source='owner.username')
    cost_delivery = serializers.IntegerField(source='massage_type.cost')
    cost_type = serializers.IntegerField(source='massage_delivery.cost')

    class Meta:
        model = MassageService
        fields = ['id', 'massage_type', 'massage_date_time', 'created', 'comment', 'massage_delivery', 'address',
                  'owner', 'cost_delivery', 'cost_type', 'total_cost']


class MassageTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MassageType
        fields = ['id','name', 'cost', 'duration', 'points']


class MassageDateTimeSerializer(serializers.ModelSerializer):
    date_time = serializers.DateTimeField(format=settings.DATETIME_FORMAT, input_formats=None)

    class Meta:
        model = MassageDateTime
        fields = ['id', 'date_time']


class MassageDeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = MassageDelivery
        fields = '__all__'


class TemporaryMassageDateTimeSerializer(serializers.ModelSerializer):
    date_time = serializers.DateTimeField(format=settings.DATETIME_FORMAT, input_formats=None)

    class Meta:
        model = MassageDateTime
        fields = ['id', 'date_time', 'is_active']
