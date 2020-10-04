from rest_framework import serializers
from massage.models import MassageService, MassageType, MassageDateTime, MassageDelivery


class MassageServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MassageService
        fields = '__all__'


class MassageTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MassageType
        fields = '__all__'


class MassageDateTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MassageDateTime
        fields = '__all__'


class MassageDeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = MassageDelivery
        fields = '__all__'
