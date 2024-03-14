import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandeAReglerPageRoutingModule } from './commande-a-regler-routing.module';

import { CommandeAReglerPage } from './commande-a-regler';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommandeAReglerPageRoutingModule
  ],
  declarations: [CommandeAReglerPage]
})
export class CommandeAReglerPageModule {}
