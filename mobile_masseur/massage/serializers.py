from rest_framework import serializers
from massage.models import MassageService, MassageType, MassageDateTime, MassageDelivery

from mobile_masseur import settings


class MassageServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MassageService
        fields = '__all__'


class MassageTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MassageType
        fields = '__all__'


class MassageDateTimeSerializer(serializers.ModelSerializer):
    date_time = serializers.DateTimeField(format=settings.DATETIME_FORMAT, input_formats=None)

    class Meta:
        model = MassageDateTime
        fields = ['id', 'date_time']


class MassageDeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = MassageDelivery
        fields = '__all__'
