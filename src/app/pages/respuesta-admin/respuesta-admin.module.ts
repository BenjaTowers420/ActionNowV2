import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespuestaAdminPageRoutingModule } from './respuesta-admin-routing.module';

import { RespuestaAdminPage } from './respuesta-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespuestaAdminPageRoutingModule
  ],
  declarations: [RespuestaAdminPage]
})
export class RespuestaAdminPageModule {}
