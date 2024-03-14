import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandeTermineePage } from './commande-terminee.page';

const routes: Routes = [
  {
    path: '',
    component: CommandeTermineePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandeTermineePageRoutingModule {}
