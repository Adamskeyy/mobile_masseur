from rest_framework import serializers
from massage.models import MassageService, MassageType, MassageDateTime, MassageDelivery

from mobile_masseur import settings


class MassageServiceSerializer(serializers.ModelSerializer):
    massage_type_name = serializers.ReadOnlyField(source='massage_type.name')
    massage_date_time_name = serializers.DateTimeField(format=settings.DATETIME_FORMAT, input_formats=None,
    source='massage_date_time.date_time', required=False, read_only=True)
    massage_delivery_name = serializers.ReadOnlyField(source='massage_delivery.place')
    owner_name = serializers.ReadOnlyField(source='owner.username')
    massage_points = serializers.ReadOnlyField(source='massage_type.points')

    class Meta:
        model = MassageService
        fields = ['id', 'massage_type', 'massage_date_time', 'created', 'comment', 'massage_delivery', 'address',
                  'owner', 'total_cost', 'massage_type_name', 'massage_delivery_name', 'massage_date_time_name',
                  'owner_name', 'massage_points', 'has_taken_place']


class MassageTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MassageType
        fields = ['id', 'name', 'cost', 'duration', 'points']


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
