import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespuestaUsuarioPage } from './respuesta-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: RespuestaUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespuestaUsuarioPageRoutingModule {}
