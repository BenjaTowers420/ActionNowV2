import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalImcPageRoutingModule } from './cal-imc-routing.module';

import { CalImcPage } from './cal-imc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalImcPageRoutingModule
  ],
  declarations: [CalImcPage]
})
export class CalImcPageModule {}
