# from users.models import User
from rest_framework import permissions, generics
from .serializers import UserSerializer, RegisterSerializer
from knox.models import AuthToken
from rest_framework.response import Response


# Register API

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

# Login API

#  Get User API
