import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { UserService } from '../../../../services/user.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-appointment-item',
  templateUrl: './appointment-item.component.html',
  styleUrls: ['./appointment-item.component.css']
})
export class AppointmentItemComponent implements OnInit {

  @Input()
  appt;

  @Output()
  deletedAppointment = new EventEmitter();
  slots;

  flipped = false;

  showSlots = false;
  haveSlotsData = false;
  slotPersonMap = {};

  success;
  errors;

  saved_start_time;
  saved_end_time;
  saved_date;

  constructor(private aptService: AppointmentsService,
              private userService: UserService) {
                this.slotPersonMap = {};
                this.slots = Observable.of([]);
                this.errors = [];
               }

  ngOnInit() {
  }


  flip () {
    this.flipped = !this.flipped;
  }
  startEdit() {
    this.saved_start_time = this.appt.start_time;
    this.saved_end_time = this.appt.end_time;
    this.saved_date = this.appt.date;
    this.flip();

  }
  cancelEdit() {
    this.appt.date = this.saved_date;
    this.appt.start_time = this.saved_start_time;
    this.appt.end_time = this.saved_end_time;
    this.flip();

  }
  updateAppointment() {
    delete this.appt.spec_id;
    console.log(this.appt);
    this.aptService.updateAppointment(this.appt)
                   .subscribe(response => {
                     this.success = 'Successfully updated appointment';
                     setTimeout(this.flip(), 2000);
                   });
  }
  deleteAppointment() {
    this.aptService.deleteAppointment(this.appt.id)
                   .subscribe(response => {
                     this.deletedAppointment.emit();
                   });
  }
  deleteSlot(i) {
    console.log('delete slot' + i);
    this.aptService.deleteSlot(this.slots[i].id)
                   .subscribe(response => this.slots.splice(i),
                              err => console.log(err));

  }
  handleSlotCreation(event) {
    console.log(event);
    const slot = event.response;
    const patient = event.patient;
    this.slots.push(slot);
    this.slotPersonMap[this.slots.length - 1] = patient;
  }
  toggleSlots() {
    this.showSlots = !this.showSlots;
    console.log(this.showSlots);
    if (!this.haveSlotsData) {
      const getSlot = this.aptService.getSlotsWithParams({'appointment': this.appt.id});
      getSlot.subscribe(data => this.slots = data);
      getSlot.subscribe(slots => {
        console.log(slots);
        for  (let i = 0; i < slots.length; i++) {
          this.userService.getPerson(slots[i].patient)
                          .subscribe(person =>
                                        this.slotPersonMap[i] = person);
        }
      });
    }
  }
}
