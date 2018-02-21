import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// shared module
import { SharedModule } from '../shared/shared.module';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { DetailCardComponent } from './detail-card/detail-card.component';
import { ShowErrorsComponent } from './show-errors/show-errors.component';
import { GenericCardComponent } from './generic-card/generic-card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@NgModule({
  declarations: [
    MainToolbarComponent,
    MainMenuComponent,
    DetailCardComponent,
    ShowErrorsComponent,
    GenericCardComponent,
    ProfileCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MainToolbarComponent,
    MainMenuComponent,
    DetailCardComponent,
    ShowErrorsComponent,
    GenericCardComponent,
    ProfileCardComponent
  ]
})
export class ComponentsModule { }
