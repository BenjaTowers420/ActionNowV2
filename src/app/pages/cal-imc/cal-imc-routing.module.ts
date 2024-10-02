import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalImcPage } from './cal-imc.page';

const routes: Routes = [
  {
    path: '',
    component: CalImcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalImcPageRoutingModule {}
