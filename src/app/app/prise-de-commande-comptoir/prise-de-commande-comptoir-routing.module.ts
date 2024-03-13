import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriseDeCommandeComptoirPage } from './prise-de-commande-comptoir.page';

const routes: Routes = [
  {
    path: '',
    component: PriseDeCommandeComptoirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriseDeCommandeComptoirPageRoutingModule {}
