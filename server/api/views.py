import json
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from django_filters.rest_framework import DjangoFilterBackend

from .serializers import (
    UserSerializer,
    GroupSerializer,
    CourseSerializer,
    DepartmentSerializer,
    PersonSerializer,
    GuestSerializer,
    WaitingRoomSerializer,
    DoctorSerializer,
    LoggedUserSerializer,
    AppointmentSpecSerializer,
    AppointmentSerializer,
    SlotSerializer,
    LabReportSerializer,
    PatientHistorySerializer
    )
from .models.doctor import Doctor
from .models.person import Person, Guest
from .models.waiting_room import WaitingRoom
from .models.trivial import Department, Course
from .models.loggeduser import LoggedUser
from .models.patient_history import PatientHistory
from .models.lab_report import LabReport
from .models.appointments import AppointmentSpec, Appointment, Slot


class CreateListMixin:
    """Allows bulk creation of a resource."""
    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super().get_serializer(*args, **kwargs)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    filter_fields = ('patron',)

    def perform_update(self, serializer):
        serializer.save()

class GuestViewSet(viewsets.ModelViewSet):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer

class WaitingRoomViewSet(viewsets.ModelViewSet):
    queryset = WaitingRoom.objects.all()
    serializer_class = WaitingRoomSerializer
    filter_fields = ('doctor',)

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    filter_fields = ('person__id',)

class LoggedUserViewSet(viewsets.ModelViewSet):
    queryset = LoggedUser.objects.all()
    serializer_class = LoggedUserSerializer

class LabReportViewSet(viewsets.ModelViewSet):
    queryset = LabReport.objects.all()
    serializer_class = LabReportSerializer
    filter_fields = ('done','patient_id',)

class PatientHistoryViewSet(viewsets.ModelViewSet):
    queryset = PatientHistory.objects.all()
    serializer_class = PatientHistorySerializer
    filter_fields = ('patient_id','doctor_id',)

class AppointmentSpecViewSet(viewsets.ModelViewSet):
    queryset = AppointmentSpec.objects.all()
    serializer_class = AppointmentSpecSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('doctor',)

class AppointmentViewSet(CreateListMixin, viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_backends= (DjangoFilterBackend,)
    filter_fields = ('doctor', 'spec')

class SlotViewSet(CreateListMixin, viewsets.ModelViewSet):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('appointment',)
