from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models.drug import Drug, Batch
from .models.person import Person
from .models.trivial import Course, Department


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups','password')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', )

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('id', 'name',)

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()
    department = DepartmentSerializer()
    course  = CourseSerializer()
    patron = PersonSerializer()

    class Meta:
        model = Person
        fields = '__all__'




class DrugSerializer(serializers.HyperlinkedModelSerializer):
    batches = serializers.PrimaryKeyRelatedField(many=True, queryset=Batch.objects.all())
    class Meta:
        model = Drug
        fields = ('generic_name', 'trade_name', 'batches')

class BatchSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Batch
        fields = ('name', 'expiry_date', 'drug', 'stores')
