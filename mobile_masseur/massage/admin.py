from django.contrib import admin

from django.contrib import admin
from massage.models import MassageService, MassageType, MassageDelivery, MassageDateTime

admin.site.register(MassageService)
admin.site.register(MassageType)
admin.site.register(MassageDelivery)
admin.site.register(MassageDateTime)

# Register your models here.
