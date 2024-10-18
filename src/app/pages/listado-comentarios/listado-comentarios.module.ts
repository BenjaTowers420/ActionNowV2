import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoComentariosPageRoutingModule } from './listado-comentarios-routing.module';

import { ListadoComentariosPage } from './listado-comentarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoComentariosPageRoutingModule
  ],
  declarations: [ListadoComentariosPage]
})
export class ListadoComentariosPageModule {}
