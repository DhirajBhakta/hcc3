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

class DrugSerializer(serializers.HyperlinkedModelSerializer):
    batches = serializers.PrimaryKeyRelatedField(many=True, queryset=Batch.objects.all())
    class Meta:
        model = Drug
        fields = ('generic_name', 'trade_name', 'batches')

class BatchSerializer(serializers.HyperlinkedModelSerializer):
    stores = serializers.PrimaryKeyRelatedField(many=True, queryset=Store.objects.all())
    class Meta:
        model = Batch
        fields = ('name', 'expiry_date', 'drug', 'stores')

class StoreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Store
        fields = ('rack', 'quantity', 'batch')


