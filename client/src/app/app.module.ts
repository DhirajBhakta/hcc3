import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//shared module
import { SharedModule } from './shared/shared.module';

//root component
import { AppComponent } from './app.component';

//ngModules
import { PatientModule } from './modules/patient/patient.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    PatientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
