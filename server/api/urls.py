from django.conf.urls import url, include
from rest_framework import routers

from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'courses', views.CourseViewSet)
router.register(r'departments',views.DepartmentViewSet)
router.register(r'persons',views.PersonViewSet)
router.register(r'guests',views.GuestViewSet)
router.register(r'waitingroom',views.WaitingRoomViewSet)
router.register(r'doctors',views.DoctorViewSet)
router.register(r'loggedusers', views.LoggedUserViewSet)
router.register(r'patienthistory',views.PatientHistoryViewSet)
router.register(r'labreports',views.LabReportViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
]
