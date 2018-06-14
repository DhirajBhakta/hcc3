import json
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .serializers import (
    UserSerializer,
    GroupSerializer,
    CourseSerializer,
    DepartmentSerializer,
    PersonSerializer,
    GuestSerializer,
    DoctorSerializer,
    LoggedUserSerializer,
    LabReportSerializer,
    PatientHistorySerializer
    )
from .models.doctor import Doctor
from .models.person import Person, Guest
from .models.trivial import Department, Course
from .models.loggeduser import LoggedUser
from .models.patient_history import PatientHistory
from .models.lab_report import LabReport


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

    def perform_update(self, serializer):
        serializer.save()

class GuestViewSet(viewsets.ModelViewSet):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class LoggedUserViewSet(viewsets.ModelViewSet):
    queryset = LoggedUser.objects.all()
    serializer_class = LoggedUserSerializer

class LabReportViewSet(viewsets.ModelViewSet):
    queryset = LabReport.objects.all()
    serializer_class = LabReportSerializer

class PatientHistoryViewSet(viewsets.ModelViewSet):
    queryset = PatientHistory.objects.all()
    serializer_class = PatientHistorySerializer
