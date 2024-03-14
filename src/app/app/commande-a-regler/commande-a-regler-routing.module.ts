import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandeAReglerPage } from './commande-a-regler';

const routes: Routes = [
  {
    path: '',
    component: CommandeAReglerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandeAReglerPageRoutingModule {}
