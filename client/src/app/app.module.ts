import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Router} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//shared module
import { SharedModule } from './shared/shared.module';

//root component
import { AppComponent } from './app.component';

//ngModules
import { ComponentsModule } from './components/components.module';
import { PatientModule } from './modules/patient/patient.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PharmaModule } from './modules/pharma/pharma.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './modules/auth/auth.module';

import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { JWTHttpClient } from './services/jwthttp.service';
import { UserService } from './services/user.service';

import { JasperoAlertsModule } from '@jaspero/ng-alerts';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    SharedModule,
    ComponentsModule,
    AuthModule,
    AppRoutingModule,
    JasperoAlertsModule.forRoot()
  ],
  providers:[
    UserService,
    {
      provide: JWTHttpClient,
      useFactory: (backend: XHRBackend, options: RequestOptions, router: Router) => {
        return new JWTHttpClient(backend, options, router);
      },
      deps: [XHRBackend, RequestOptions, Router]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
