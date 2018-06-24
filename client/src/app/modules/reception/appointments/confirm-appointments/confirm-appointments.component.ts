import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { Slot } from '../../models/slot.model';

@Component({
  selector: 'app-confirm-appointments',
  templateUrl: './confirm-appointments.component.html',
  styleUrls: ['./confirm-appointments.component.css']
})
export class ConfirmAppointmentsComponent implements OnInit {

  slots;
  success;
  errors;

  constructor(private aptService: AppointmentsService) { }

  ngOnInit() {
    // this.slots = this.aptService.pollAppointments({'status' : 'BO'});
    this.aptService.pollAppointments({'status' : 'BO'}).subscribe(data => this.slots = data);


  }
  modifySlot(confirm, i) {
    const status = confirm ? 'BO' : 'RJ';
    const success_msg = confirm ? 'confirmed' : 'rejected';
    const error_msg = confirm ? 'confirming' : 'rejecting';

    const selectedSlot = this.slots[i];
    const slot = new Slot(status, selectedSlot.patient, selectedSlot.appointment);
    slot.id = selectedSlot.id;
    slot.appointment = selectedSlot.appointment.id;
    this.aptService.updateSlot(slot)
      .subscribe(res => {
        console.log(res);
        this.slots.splice(i, 1);
        this.success = 'Appointment slot has successfully been ' + success_msg;
        setInterval(() => this.success = '', 5000);
      }, err => {
        console.log(err);
        this.errors = ['Some error occurred while ' + error_msg + ' appointment slot'];
        setInterval(() => this.errors = '', 5000);
    });

  }
  confirmSlot(i) {
    this.modifySlot(true, i);
  }
  rejectSlot(i) {
    this.modifySlot(false, i);
  }
}
