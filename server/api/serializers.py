from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from django.contrib.auth import authenticate, get_user_model

from .models.doctor import Doctor
from .models.drug import Drug, Batch
from .models.person import Person
from .models.trivial import Course, Department
from .models.prescription import Prescription
from .models.pharma import PharmaRecord, DispensedDrug


def invertDict(dictionary):
    return dict([(v,k) for k,v in dictionary.items()])


class KeyValueField(serializers.Field):
    def __init__(self, labels, *args, **kwargs):
        self.labels = labels
        self.inverted_labels = invertDict(labels)
        return super().__init__(*args, **kwargs)

    def to_representation(self, obj):
        if type(obj) is list:
            return [self.labels.get(key,None) for key in obj]
        return self.labels.get(obj, None)

    def to_internal_value(self, val):
        if type(val) is list:
            return [self.inverted_labels.get(o, None ) for key in val]
        return self.inverted_labels.get(val,None)


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('name', )

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('name',)

class PatronSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()
    course  = CourseSerializer()
    gender = KeyValueField(labels={'M':"Male",'F':"Female",'O':"Other"})
    patient_type = KeyValueField(labels={'S':'Student', 'E':'Employee','D':'Dependant'})

    class Meta:
        model = Person
        fields = '__all__'

class DependantSerializer(PatronSerializer):
    patron = PatronSerializer()

class PersonSerializer(DependantSerializer):
    dependants = DependantSerializer(many=True)

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)

class UserSerializer(serializers.ModelSerializer):
    person = PersonSerializer()
    groups = GroupSerializer(many=True)
    class Meta:
        model = User
        fields = ('username', 'email', 'groups','password', 'person')





class DoctorSerializer(serializers.ModelSerializer):
    person = PersonSerializer()

    class Meta:
        model = Doctor
        fields = '__all__'

class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = ('batch', 'expiry_date', 'drug')

#Assuming doctor uses only trade_names
class DrugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drug
        fields = ('id', 'trade_name')


class DrugAndBatchesSerializer(serializers.ModelSerializer):
    batches = BatchSerializer(many=True, read_only=True)
    class Meta:
        model = Drug
        fields = ('id','trade_name', 'batches')

class PrescriptionSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    # doctor_id = serializers.PrimaryKeyRelatedField(source='doctor', queryset=Doctor.objects.all(), write_only=True)
    patient = PersonSerializer(read_only=True)
    patient_id = serializers.PrimaryKeyRelatedField(source='patient', queryset=Person.objects.all(), write_only=True)
    prescribed_drugs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    def save(self):
        user = serializers.CurrentUserDefault().user
        this_doctor = Doctor.objects.filter(person__user__username=user.username)
        if this_doctor is None:
            raise serializers.ValidationError('You are not a doctor!')
        doctor_id = this_doctor.get().id
        patient_id = self.validated_data['patient_id']
        prescribed_drugs = self.validated_data['prescribed_drugs']

    class Meta:
        model = Prescription
        fields = ('doctor', 'patient', 'patient_id', 'indication', 'date_time', 'prescribed_drugs')

class PharmaRecordSerializer(serializers.ModelSerializer):

    dispensed_drugs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = PharmaRecord
        fields = ('prescription', 'dispensed_drugs')
