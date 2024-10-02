import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContadorCaloriasPage } from './contador-calorias.page';

const routes: Routes = [
  {
    path: '',
    component: ContadorCaloriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContadorCaloriasPageRoutingModule {}
