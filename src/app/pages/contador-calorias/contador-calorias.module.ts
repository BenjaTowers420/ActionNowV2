import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContadorCaloriasPageRoutingModule } from './contador-calorias-routing.module';

import { ContadorCaloriasPage } from './contador-calorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContadorCaloriasPageRoutingModule
  ],
  declarations: [ContadorCaloriasPage]
})
export class ContadorCaloriasPageModule {}
