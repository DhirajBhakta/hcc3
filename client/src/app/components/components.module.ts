import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

//shared module
import { SharedModule } from '../shared/shared.module';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { DetailCardComponent } from './detail-card/detail-card.component';

@NgModule({
  declarations: [
    MainToolbarComponent,
    MainMenuComponent,
    DetailCardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule
  ],
  exports: [
    MainToolbarComponent,
    MainMenuComponent,
    DetailCardComponent
  ]
})
export class ComponentsModule { }
