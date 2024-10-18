import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoComentariosPage } from './listado-comentarios.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoComentariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoComentariosPageRoutingModule {}
