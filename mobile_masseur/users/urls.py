from rest_framework import routers
from .api import RegisterAPI, LoginAPI, UserAPI, AllUsersViewSet
from django.urls import path, include
from knox import views as knox_views

user_list = AllUsersViewSet.as_view({'get': 'list'})

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/all-users', user_list, name='user-list'),
]
