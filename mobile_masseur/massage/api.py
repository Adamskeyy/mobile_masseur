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
    queryset = MassageType.objects.all()
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
    queryset = MassageDateTime.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MassageDateTimeSerializer
