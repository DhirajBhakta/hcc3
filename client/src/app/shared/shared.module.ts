import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

//angular-materials
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion'


@NgModule({
  imports: [
  ],

  exports: [
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule
  ],
})
export class SharedModule { }
