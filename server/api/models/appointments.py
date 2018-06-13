from django.db import models
from .doctor import Doctor
from .person import Person



BOOKING_STATUS = (('BO', 'BOOKED'),
                  ('WL', 'WAITING_LIST'),
                  ('BC', 'BOOKED_CONFIRMED'), )
                  
class AppointmentSpec(models.Model):
    '''
    This class is the specifiction of the appointment. This is used to generate the
    appointment instances at particular dates. In other words these are the definitions
    of the appointments. 
    '''
    doctor = models.ForeignKey(Doctor, on_delete = models.CASCADE, null = False)

    '''
    A doctoor can have multiple appoppintment specs. 
    Each spec defines for the particular combination : 

        -Days
        -Time
        -Weeks 
                that the schedule is active 
    '''
    sunday = models.BooleanField(null=False)
    monday = models.BooleanField(null=False)
    tuesday = models.BooleanField(null=False)
    wednesday = models.BooleanField(null=False)
    thursday = models.BooleanField(null=False)
    friday = models.BooleanField(null=False)
    saturday = models.BooleanField(null=False)

    start_time = models.DateTimeField(null=False)
    end_time = models.DateTimeField(null=False)

    all_weeks = models.BooleanField(null=False)
    week1 = models.BooleanField(null=False)
    week2 = models.BooleanField(null=False)
    week3 = models.BooleanField(null=False)
    week4 = models.BooleanField(null=False)


class Appointment(models.Model):
    '''
    These are the appointment instances which are assigned to particular dates.
    These are generated from the appointment spec. 
    '''
    spec = models.ForeignKey(AppointmentSpec, on_delete=models.SET_NULL, null=True)
    doctor = models.ForeignKey(Doctor, null=False, on_delete=models.CASCADE)

    date = models.DateField(null=False)
    start_time = models.TimeField(null=False)
    end_time = models.TimeField(null=False)

class Slot(models.Model):
    '''
    This class is the actual appointment slot that the patient takes with the doctor.

    '''
    patient = models.ForeignKey(Person, on_delete=models.CASCADE)

    appointment = models.ForeignKey(Appointment, null=False, on_delete=models.CASCADE, related_name='slots')
    status = models.CharField(max_length=2, choices=BOOKING_STATUS)

    
    