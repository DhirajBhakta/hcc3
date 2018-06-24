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
import { PatientProfileComponent } from './patient-profile/patient-profile.component';


//services
import { PatientService } from './services/patient.service';
import { ReceptionModule } from '../reception/reception.module';


@NgModule({
  declarations: [
    PatientComponent,
    PatientProfileComponent,
  ],

  imports: [
    CommonModule,
    ComponentsModule,
    PatientRoutingModule,
    SharedModule,
    ReceptionModule
  ],
  // exports : [
  //   PatientComponent
  // ],
  providers: [
    PatientService
  ]

})
export class PatientModule { }
