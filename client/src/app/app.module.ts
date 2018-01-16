import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialComponents } from '../angular-material/material-components.module';


import { AppComponent } from './app.component';
import { PatientRootComponent } from './patient-root/patient-root.component';
import { DoctorRootComponent } from './doctor-root/doctor-root.component';
import { PharmaRootComponent } from './pharma-root/pharma-root.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    PatientRootComponent,
    DoctorRootComponent,
    PharmaRootComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MaterialComponents
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
