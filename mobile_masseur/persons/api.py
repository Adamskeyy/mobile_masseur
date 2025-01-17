from persons.models import Person
from rest_framework import viewsets, permissions
from .serializers import PersonSerializer


# Person Viewset
class PersonViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PersonSerializer

    def get_queryset(self):
        return self.request.user.persons.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
