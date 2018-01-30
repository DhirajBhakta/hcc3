import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
//services
import { AppointmentsService } from '../services/appointments.service';




@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  specialities;
  bookedAppointmentsData:{};
  specialitySelectionForm: FormGroup;
  dateSelectionForm: FormGroup;

  bundle={};
  isLinear=true;

  constructor(private service:AppointmentsService, private _fb:FormBuilder) {
   this.specialities = [];
    this.specialitySelectionForm = this._fb.group({
      speciality:['',Validators.required ],
    });
    this.dateSelectionForm = this._fb.group({
      date:['',Validators.required ],
    });
   }

   ngOnInit() {
     this.service.getSpecialities().subscribe(data => this.specialities = data);
     this.bookedAppointmentsData = this.service.getBookedAppointments();
   }

   


  appointmentCancel():void{
    console.log('appointmentcancelled lol');
  }


}
