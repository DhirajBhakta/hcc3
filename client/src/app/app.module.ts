import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//shared module
import { SharedModule } from './shared/shared.module';

//root component
import { AppComponent } from './app.component';

//ngModules
import { PatientModule } from './modules/patient/patient.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PharmaModule } from './modules/pharma/pharma.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './modules/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    PatientModule,
    DoctorModule,
    PharmaModule,
    AuthModule,
    AppRoutingModule
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
