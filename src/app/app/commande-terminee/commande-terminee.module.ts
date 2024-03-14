import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandeTermineePageRoutingModule } from './commande-terminee-routing.module';

import { CommandeTermineePage } from './commande-terminee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommandeTermineePageRoutingModule
  ],
  declarations: [CommandeTermineePage]
})
export class CommandeTermineePageModule {}
