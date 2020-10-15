from rest_framework import routers
from .api import MassageServiceViewSet, MassageTypeViewSet, MassageDateTimeViewSet, MassageDeliveryViewSet, \
    TemporaryMassageDateTimeViewSet, TemporaryMassageServiceViewSet

router = routers.DefaultRouter()
router.register('api/massage/type', MassageTypeViewSet, 'massage_type')
router.register('api/massage/service', MassageServiceViewSet, 'massage_service')
router.register('api/massage/delivery', MassageDeliveryViewSet, 'massage_delivery')
router.register('api/massage/datetime', MassageDateTimeViewSet, 'massage_datetime')
router.register('api/temporary/massage/datetime', TemporaryMassageDateTimeViewSet, 'temporary_massage_datetime')
router.register('api/temporary/massage/service', TemporaryMassageServiceViewSet, 'temporary_massage_datetime')

urlpatterns = router.urls
