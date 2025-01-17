from rest_framework import serializers
from persons.models import Person

# Person Serializer


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'
