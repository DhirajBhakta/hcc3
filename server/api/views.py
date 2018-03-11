from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .serializers import (
    UserSerializer,
    GroupSerializer,
    CourseSerializer,
    DepartmentSerializer,
    PersonSerializer,
    DrugSerializer,
    BatchSerializer,
    PrescriptionSerializer,
    PharmaRecordSerializer
    )
from .models.drug import Drug, Batch
from .models.person import Person
from .models.trivial import Department, Course
from .models.prescription import Prescription
from .models.pharma import PharmaRecord



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

class DrugViewSet(viewsets.ModelViewSet):

    queryset = Drug.objects.all()
    serializer_class = DrugSerializer

class BatchViewSet(viewsets.ModelViewSet):

    queryset = Batch.objects.all()
    serializer_class = BatchSerializer

class PharmaRecordViewSet(viewsets.ModelViewSet):
    queryset = PharmaRecord.objects.all()
    serializer_class = PharmaRecordSerializer

class PrescriptionViewSet(viewsets.ModelViewSet):
    authentication_classes = (JSONWebTokenAuthentication ,)
    permission_classes = (IsAuthenticated, )
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
