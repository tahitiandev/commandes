import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriseDeCommandePage } from './prise-de-commande.page';

const routes: Routes = [
  {
    path: '',
    component: PriseDeCommandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriseDeCommandePageRoutingModule {}
