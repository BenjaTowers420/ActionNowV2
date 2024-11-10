import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespuestaAdminPage } from './respuesta-admin.page';

const routes: Routes = [
  {
    path: '',
    component: RespuestaAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespuestaAdminPageRoutingModule {}
