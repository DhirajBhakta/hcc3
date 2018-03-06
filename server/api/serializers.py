from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models.Drug import Drug, Batch, Store


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ('rack', 'quantity', 'batch')

class BatchSerializer(serializers.ModelSerializer):
    stores = StoreSerializer(many=True)
    class Meta:
        model = Batch
        fields = ('name', 'expiry_date', 'drug', 'stores')

class DrugSerializer(serializers.ModelSerializer):
    batches = BatchSerializer(many=True)
    class Meta:
        model = Drug
        fields = ('generic_name', 'trade_name', 'batches')

