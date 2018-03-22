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
    DrugSerializer,
    BatchSerializer,
    PrescriptionSerializer,
    PharmaRecordSerializer,
    DispensedDrugSerializer
    )
from .models.drug import Drug, Batch
from .models.person import Person
from .models.trivial import Department, Course
from .models.prescription import Prescription
from .models.pharma import PharmaRecord, DispensedDrug


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

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        if('fields' in self.request.query_params):
            kwargs['fields'] = json.loads(self.request.query_params['fields'])
        return serializer_class(*args, **kwargs)


class BatchViewSet(viewsets.ModelViewSet):
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer

    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
             kwargs["many"] = isinstance(kwargs["data"], list)
        return super().get_serializer(*args, **kwargs)

class PharmaRecordViewSet(viewsets.ModelViewSet):
    queryset = PharmaRecord.objects.all()
    serializer_class = PharmaRecordSerializer

class DispensedDrugViewSet(viewsets.ModelViewSet):
    queryset = DispensedDrug.objects.all()
    serializer_class = DispensedDrugSerializer

    def perform_create(self, serializer):
        data = serializer.validated_data
        batch = data['batch']
        batch_search = Batch.objects.filter(batch=batch.batch)
        try:
            current_batch = batch_search.get()
            current_batch.quantity -= data['quantity']
            pr = PharmaRecord.objects.get(id=data['pharmarecord'].id)
            pr.status = 'A'
            pr.save()
            current_batch.save()
        except:
            raise ValidationError()
        serializer.save()



# TODO: Convert this back to ViewSet instead

class PharmaRecordListView(APIView):
    """
    PharmaRecords need their status to change as they are sent to
    the pharmacy, thus the get function is overwritten.

    GET, PUT, DELETE Requests are allowed on PharmaRecord object, POST
    is disallowed as creation of a Prescription object will auto-create
    a PharmaRecord object.
    """

    def get(self, request, format=None):
        status = request.GET.get('status', '')
        print("requested status is ", status)
        if status == '':
            records = PharmaRecord.objects.all()
        elif status in ('N', 'A', 'S'):
            records = PharmaRecord.objects.filter(status=status)
            for record in records:
                if record.status == 'N':
                    record.status = 'S'
                    record.save()
        serializer = PharmaRecordSerializer(records, many=True)
        return Response(serializer.data)


class PharmaRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    PharmaRecordDetail takes care of GET, PUT, DELETE for instances
    of PharmaRecord
    """
    queryset = PharmaRecord.objects.all()
    serializer_class = PharmaRecordSerializer

    # def put(self, request, *args, **kwargs):
    #     if "dispensed_drugs" in request.data:
    #         serializer = DispensedDrugSerializer(data=request.data["dispensed_drugs"], many=True)
    #         serializer.is_valid(raise_exception=True)
    #         serializer.save()
    #         return Response(serializer.data)
    #     return self.update(request, *args, **kwargs)


class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer

    def get_queryset(self):
        queryset = Prescription.objects.all()
        user = self.request.user;
        if user is not None:
            user_group = user.groups.all()[0].name
            if user_group == "PATIENT":
                queryset = queryset.filter(patient=user.person)
            elif user_group == 'DOCTOR':
                queryset = queryset.filter(doctor_person=user.person)
        return queryset
