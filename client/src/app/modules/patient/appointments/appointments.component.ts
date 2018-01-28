import { Component, OnInit } from '@angular/core';

//services
import { AppointmentsService } from '../services/appointments.service';



@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  bookedAppointmentsData:{};
  specialities = [
    {value:1, viewValue:'Dental'},
    {value:2, viewValue:'ENT'},
    {value:3, viewValue:'Orthopaedics'},
    {value:4, viewValue:'Gynaecology'},
    {value:5, viewValue:'Psychiatry'},
    {value:6, viewValue:'Cardiology'},
  ];
  bundle={}

  constructor(private service:AppointmentsService) { }

  appointmentCancel():void{
    console.log('appointmentcancelled lol')
  }
  ngOnInit() {
    this.bookedAppointmentsData = this.service.getBookedAppointments();
  }

}
