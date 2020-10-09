from rest_framework import routers
from .api import RegisterAPI
from django.urls import path, include
from knox import views as knox_views


urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
]
