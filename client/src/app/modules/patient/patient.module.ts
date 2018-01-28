import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';

//SharedModule
import { SharedModule } from '../../shared/shared.module';

//Routing-module for this patientModule
import { PatientRoutingModule } from './patient-routing.module';

//Root-Component of this patientModule
import { PatientComponent } from './patient.component';
//Components housed in this patientModule
import { AppointmentsComponent } from './appointments/appointments.component';
import { HistoryComponent } from './history/history.component';
import { BookedAppointmentCardComponent } from './appointments/booked-appointment-card/booked-appointment-card.component';

//services
import { AppointmentsService } from './services/appointments.service';


@NgModule({
  declarations: [
    PatientComponent,
    AppointmentsComponent,
    HistoryComponent,
    BookedAppointmentCardComponent,
  ],

  imports: [
    CommonModule,
    ComponentsModule,
    PatientRoutingModule,
    SharedModule
  ],
  // exports : [
  //   PatientComponent
  // ],
  providers:[
    AppointmentsService
  ]

})
export class PatientModule { }
