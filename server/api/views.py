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
    lookup_field = 'user__username'
    # def get_queryset(self):
    #     print("REACHED HERE")
    #     queryset = Person.objects.all()
    #     username = self.request.query_params.get('username',None)
    #     if username is not None:
    #         queryset = queryset.get(user__username=username)
    #     print("QUERYSET:",queryset)
    #     return queryset

    #   def get_object(self):
    #     queryset = self.filter_queryset(self.get_queryset())
      #
    #     # Perform the lookup filtering.
    #     lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
      #
    #     assert lookup_url_kwarg in self.kwargs, (
    #         'Expected view %s to be called with a URL keyword argument '
    #         'named "%s". Fix your URL conf, or set the `.lookup_field` '
    #         'attribute on the view correctly.' %
    #         (self.__class__.__name__, lookup_url_kwarg)
    #     )
      #
    #     filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
    #     obj = get_object_or_404(queryset, **filter_kwargs)
      #
    #     # May raise a permission denied
    #     self.check_object_permissions(self.request, obj)
      #
    #     return obj



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
