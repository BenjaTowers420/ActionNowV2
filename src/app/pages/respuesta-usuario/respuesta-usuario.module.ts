import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespuestaUsuarioPageRoutingModule } from './respuesta-usuario-routing.module';

import { RespuestaUsuarioPage } from './respuesta-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespuestaUsuarioPageRoutingModule
  ],
  declarations: [RespuestaUsuarioPage]
})
export class RespuestaUsuarioPageModule {}
