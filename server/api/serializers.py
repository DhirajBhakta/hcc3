from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from django.contrib.auth import authenticate, get_user_model

from .models.doctor import Doctor
from .models.drug import Drug, Batch
from .models.person import Person, Guest
from .models.trivial import Course, Department
from .models.prescription import Prescription, PrescribedDrug
from .models.pharma import PharmaRecord, DispensedDrug
from .models.loggeduser import LoggedUser

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

class PatronSerializer(DynamicFieldsModelSerializer):
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

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = '__all__'


class DoctorSerializer(serializers.ModelSerializer):
    person = PersonSerializer()
    patients_queue = PersonSerializer(many=True)
    guest_patients_queue = GuestSerializer(many=True)
    class Meta:
        model = Doctor
        fields = '__all__'

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


class BatchSerializer(serializers.ModelSerializer):
    drug = serializers.StringRelatedField()
    drug_id = serializers.PrimaryKeyRelatedField(source='drug', queryset=Drug.objects.all(), write_only=True)
    class Meta:
        model = Batch
        fields = ('id', 'batch', 'quantity', 'expiry_date', 'rack', 'drug', 'drug_id')


class DrugSerializer(DynamicFieldsModelSerializer):
    """
        Assuming doctor uses only trade_names
    """
    batches = BatchSerializer(many=True, read_only=True)

    class Meta:
        model = Drug
        fields = ('id', 'trade_name', 'generic_name', 'batches')


class PrescribedDrugSerializer(serializers.ModelSerializer):
    drug = DrugSerializer(read_only=True)
    drug_id = serializers.PrimaryKeyRelatedField(source='drug', queryset=Drug.objects.all(), write_only=True)

    class Meta:
        model = PrescribedDrug
        fields = ('id', 'drug_id', 'drug', 'quantity', 'comments')


class PrescriptionSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    patient_id = serializers.PrimaryKeyRelatedField(source='patient', queryset=Person.objects.all(), write_only=True)
    patient = PersonSerializer(read_only=True, fields=('id', 'name'))
    prescribed_drugs = PrescribedDrugSerializer(many=True)

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            doctor = Doctor.objects.get(person__user=user)
            validated_data['doctor_id'] = doctor.id
            prescribed_drugs = validated_data.pop('prescribed_drugs')
            prescription = Prescription.objects.create(**validated_data)
            for drug in prescribed_drugs:
                drug['prescription'] = prescription
            prescribedDrugs = PrescribedDrug.objects.bulk_create([PrescribedDrug(**drug) for drug in prescribed_drugs])
            return prescription
        return None

    class Meta:
        model = Prescription
        fields = ('id','doctor', 'patient', 'patient_id', 'indication', 'date_time', 'prescribed_drugs')

class DispensedDrugSerializer(serializers.ModelSerializer):
    batch_id = serializers.PrimaryKeyRelatedField(source='batch', queryset=Batch.objects.all(), write_only=True)
    batch = BatchSerializer(read_only=True)
    pharmarecord = serializers.PrimaryKeyRelatedField(queryset=PharmaRecord.objects.all())

    class Meta:
        model = DispensedDrug
        fields = ('batch', 'batch_id', 'quantity', 'pharmarecord')


class PharmaRecordSerializer(serializers.ModelSerializer):

    prescription = PrescriptionSerializer(read_only=True)
    dispensed_drugs = DispensedDrugSerializer(many=True)

    class Meta:
        model = PharmaRecord
        fields = ('prescription', 'dispensed_drugs')

class LoggedUserSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = LoggedUser
        fields = '__all__'
#
# class DPMSerializer(serializers.ModelSerializer):
#
#     patient_id = serializers.PrimaryKeyRelatedField(source='patient', queryset=Person.objects.all(), write_only=True)
#     patient = PersonSerializer(read_only=True)
#     doctor_id = serializers.PrimaryKeyRelatedField(source='doctor', queryset=User.objects.all(), write_only=True)
#     doctor = UserSerializer(read_only=True)
#
#     class Meta:
#         model = DoctorPatientMap
#         fields = ('id', 'doctor', 'patient', 'doctor_id', 'patient_id')
