import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// shared module
import { SharedModule } from '../shared/shared.module';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { ShowErrorsComponent } from './show-errors/show-errors.component';
import { GenericCardComponent } from './generic-card/generic-card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { HttpErrorComponent } from './http-error/http-error.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';

@NgModule({
  declarations: [
    MainToolbarComponent,
    MainMenuComponent,
    ShowErrorsComponent,
    GenericCardComponent,
    ProfileCardComponent,
    HttpErrorComponent,
    AutoCompleteComponent,
    BookAppointmentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MainToolbarComponent,
    MainMenuComponent,
    ShowErrorsComponent,
    GenericCardComponent,
    ProfileCardComponent,
    AutoCompleteComponent,
    HttpErrorComponent,
    BookAppointmentComponent
  ]
})
export class ComponentsModule { }
