import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecomendacionRutinaPage } from './recomendacion-rutina.page';

const routes: Routes = [
  {
    path: '',
    component: RecomendacionRutinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecomendacionRutinaPageRoutingModule {}
