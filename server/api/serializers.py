from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models.doctor import Doctor
from .models.drug import Drug, Batch
from .models.person import Person
from .models.trivial import Course, Department
from .models.prescription import Prescription
from .models.pharma import PharmaRecord, DispensedDrug


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

class PersonSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    department = DepartmentSerializer()
    course  = CourseSerializer()
    patron = PersonSerializer()

    class Meta:
        model = Person
        fields = '__all__'

class DoctorSerializer(serializers.ModelSerializer):
    person = PersonSerializer()

    class Meta:
        model = Doctor
        fields = '__all__'

class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = ('name', 'expiry_date', 'drug')

class DrugSerializer(serializers.ModelSerializer):
    batches = BatchSerializer(many=True)
    class Meta:
        model = Drug
        fields = ('generic_name', 'trade_name', 'batches')

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
        fields = ('doctor', 'doctor_id', 'patient', 'patient_id', 'indication', 'date_time', 'prescribed_drugs')

class PharmaRecordSerializer(serializers.ModelSerializer):

    dispensed_drugs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = PharmaRecord
        fields = ('prescription', 'dispensed_drugs')