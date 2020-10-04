from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('users/', include('users.urls')),
    path('massage/', include('massage.urls')),
]
