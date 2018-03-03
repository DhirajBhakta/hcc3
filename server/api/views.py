from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import UserSerializer, GroupSerializer, DrugSerializer, BatchSerializer, StoreSerializer
from .models.Drug import Drug, Batch, Store


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class DrugViewSet(viewsets.ModelViewSet):
    
    queryset = Drug.objects.all()
    serializer_class = DrugSerializer

class BatchViewSet(viewsets.ModelViewSet):
    
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer

class StoreViewSet(viewsets.ModelViewSet):
    
    queryset = Store.objects.all()
    serializer_class = StoreSerializer