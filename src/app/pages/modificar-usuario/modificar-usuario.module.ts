import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarUsuarioPageRoutingModule } from './modificar-usuario-routing.module';

import { ModificarPage } from './modificar-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarUsuarioPageRoutingModule
  ],
  declarations: [ModificarPage]
})
export class ModificarUsuarioPageModule {}
