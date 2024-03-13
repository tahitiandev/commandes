import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServirPage } from './servir.page';

const routes: Routes = [
  {
    path: '',
    component: ServirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServirPageRoutingModule {}
