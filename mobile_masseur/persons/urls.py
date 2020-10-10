from rest_framework import routers
<<<<<<< HEAD:mobile_masseur/users/urls.py
from .api import RegisterAPI, LoginAPI, UserAPI
from django.urls import path, include
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
]
=======
from .api import PersonViewSet

router = routers.DefaultRouter()
router.register('api/persons', PersonViewSet, 'persons')

urlpatterns = router.urls
>>>>>>> frontendAuth:mobile_masseur/persons/urls.py
