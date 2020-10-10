import datetime
from django.utils import timezone

from .models import MassageService, MassageType, MassageDelivery, MassageDateTime
from rest_framework import viewsets, permissions
from .serializers import MassageServiceSerializer, MassageTypeSerializer, MassageDeliverySerializer, \
    MassageDateTimeSerializer


class MassageServiceViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = MassageServiceSerializer

    def get_queryset(self):
        return self.request.user.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class MassageTypeViewSet(viewsets.ModelViewSet):
    queryset = MassageType.objects.filter(is_active=True)
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MassageTypeSerializer


class MassageDeliveryViewSet(viewsets.ModelViewSet):
    queryset = MassageDelivery.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MassageDeliverySerializer


class MassageDateTimeViewSet(viewsets.ModelViewSet):
    queryset = MassageDateTime.objects.filter(is_active=True)
    USE_TZ = True
    for data in queryset:
        if data.date_time < timezone.now():
            data.is_active = False
            data.save()
    queryset = MassageDateTime.objects.filter(is_active=True)
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MassageDateTimeSerializer
