from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from django.contrib.auth import authenticate, get_user_model

from .models.doctor import Doctor
from .models.person import Person, Guest
from .models.waiting_room import WaitingRoom
from .models.trivial import Course, Department
from .models.loggeduser import LoggedUser
from .models.patient_history import PatientHistory
from .models.lab_report import LabReport


def invertDict(dictionary):
    return dict([(v, k) for k, v in dictionary.items()])


class KeyValueField(serializers.Field):
    def __init__(self, labels, *args, **kwargs):
        self.labels = labels
        self.inverted_labels = invertDict(labels)
        return super().__init__(*args, **kwargs)

    def to_representation(self, obj):
        if type(obj) is list:
            return [self.labels.get(key, None) for key in obj]
        return self.labels.get(obj, None)

    def to_internal_value(self, val):
        if type(val) is list:
            return [self.inverted_labels.get(o, None) for key in val]
        return self.inverted_labels.get(val, None)


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('name', )


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('name',)


class PersonSerializer(DynamicFieldsModelSerializer):
    department = DepartmentSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    gender = KeyValueField(labels={'M': "MALE", 'F': "FEMALE", 'O': "Other"}, default=None)
    patient_type = KeyValueField(labels={'S': 'STUDENT', 'E': 'EMPLOYEE', 'D': 'DEPENDANT'})

    def create(self, validated_data):
        data = self.context["request"].data;
        dept = None
        if("department" in data):
            dept = Department.objects.get(name=data['department'])
        person = Person.objects.create(**validated_data,department=dept)
        return person

    class Meta:
        model = Person
        fields = '__all__'

# for optimization


class MinimalPersonSerializer(serializers.ModelSerializer):
    patient_type = KeyValueField(
        labels={'S': 'STUDENT', 'E': 'EMPLOYEE', 'D': 'DEPENDANT'})

    class Meta:
        model = Person
        fields = ('id', 'name', 'patient_type',)


class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = '__all__'


class WaitingRoomSerializer(serializers.ModelSerializer):
    patient = MinimalPersonSerializer(read_only=True)
    patient_id = serializers.PrimaryKeyRelatedField(
        write_only=True, allow_null=True, source='patient', queryset=Person.objects.all(),)
    guest = GuestSerializer(read_only=True)
    guest_id = serializers.PrimaryKeyRelatedField(
        write_only=True, allow_null=True, source='guest', queryset=Guest.objects.all(),)

    class Meta:
        model = WaitingRoom
        fields = '__all__'


class DoctorSerializer(serializers.ModelSerializer):
    person = MinimalPersonSerializer()

    class Meta:
        model = Doctor
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())])
    groups = GroupSerializer(read_only=True, many=True)
    person = MinimalPersonSerializer(read_only=True)
    password = serializers.CharField(write_only=True)

    # used during data collection: refer employee_loader.py
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'], password=validated_data['password'])
        if("group" in self.context["request"].data):
            groupname = self.context["request"].data["group"]
            group = Group.objects.get(name=groupname)
            group.user_set.add(user)
        return user

    class Meta:
        model = User
        fields = ('id','username', 'password', 'groups', 'email','person')


class LoggedUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = LoggedUser
        fields = '__all__'


class LabReportSerializer(serializers.ModelSerializer):
    patient = MinimalPersonSerializer(read_only=True)
    patient_id = serializers.PrimaryKeyRelatedField(
        write_only=True, allow_null=True, source='patient', queryset=Person.objects.all(),)
    doctor = DoctorSerializer(read_only=True)
    doctor_id = serializers.PrimaryKeyRelatedField(
        write_only=True, allow_null=True, source='doctor', queryset=Doctor.objects.all(),)

    class Meta:
        model = LabReport
        fields = '__all__'


class PatientHistorySerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer()

    class Meta:
        model = PatientHistory
        fields = '__all__'
