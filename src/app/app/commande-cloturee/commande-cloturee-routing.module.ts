import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandeClotureePage } from './commande-cloturee.page';

const routes: Routes = [
  {
    path: '',
    component: CommandeClotureePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandeClotureePageRoutingModule {}
