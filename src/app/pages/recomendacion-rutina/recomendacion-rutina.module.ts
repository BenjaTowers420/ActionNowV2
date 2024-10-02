import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecomendacionRutinaPageRoutingModule } from './recomendacion-rutina-routing.module';

import { RecomendacionRutinaPage } from './recomendacion-rutina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecomendacionRutinaPageRoutingModule
  ],
  declarations: [RecomendacionRutinaPage]
})
export class RecomendacionRutinaPageModule {}
