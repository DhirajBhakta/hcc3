from django.conf.urls import url, include
from rest_framework import routers

from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'courses', views.CourseViewSet)
router.register(r'departments',views.DepartmentViewSet)
router.register(r'persons',views.PersonViewSet)
router.register(r'doctors',views.DoctorViewSet)
router.register(r'drugs', views.DrugViewSet)
router.register(r'batches', views.BatchViewSet)
router.register(r'prescriptions', views.PrescriptionViewSet)
router.register(r'dispensed', views.DispensedDrugViewSet)
router.register(r'loggedusers', views.LoggedUserViewSet)
router.register(r'appointment_specs', views.AppointmentSpecViewSet)
# router.register(r'doctorpatientmap', views.DPMViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'pharmarecords/(?P<pk>[0-9]+)$', views.PharmaRecordDetailView.as_view()),
    url(r'pharmarecords', views.PharmaRecordListView.as_view()),
    url(r'^', include(router.urls)),
    #url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
