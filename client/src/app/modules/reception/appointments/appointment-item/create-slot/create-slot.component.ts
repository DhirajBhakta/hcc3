import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../../../services/user.service';
import { Slot } from '../../../models/slot.model';
import { AppointmentsService } from '../../../services/appointments.service';

@Component({
  selector: 'app-create-slot',
  templateUrl: './create-slot.component.html',
  styleUrls: ['./create-slot.component.css']
})
export class CreateSlotComponent implements OnInit {

  enteredId;
  family;

  // for show-errors component
  success;
  errors;

  flipped = false;

  // to notify parent of finished booking with the slot
  @Output()
  slotCreate = new EventEmitter<Object>();

  @Input()
  appointment_id;
  booking_status;
  patient;

  flip () {
    this.flipped = !this.flipped;
    this.booking_status = null;
    this.patient = null;
    this.success = null;
    this.errors = [];

  }

  constructor(private userService: UserService,
             private aptService: AppointmentsService) { }

  ngOnInit() {
  }

  getFamily() {
    const familyGetter = this.userService.getFamily(this.enteredId)
                                  .catch(err => {
                                      console.log(err);
                                      this.errors = ['Entered id is not valid'];
                                      return Observable.of([]); });
    familyGetter.subscribe( (family) => {
      this.errors = [];
      this.family = family;
    });
  }
  createSlot() {
    const slot = new Slot(this.booking_status, this.patient.id, this.appointment_id);
    console.log(slot);
    this.aptService.createSlot(slot)
                   .subscribe( response => {console.log(response);
                               this.slotCreate.emit({'response': response, 'patient': this.patient});
                               this.family = undefined;
                               this.enteredId = '';
                               this.flip(); } ,
                               err => {this.errors = ['An error ocurred']; });


  }
}
