import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriseDeCommandePageRoutingModule } from './prise-de-commande-routing.module';

import { PriseDeCommandePage } from './prise-de-commande.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriseDeCommandePageRoutingModule
  ],
  declarations: [PriseDeCommandePage]
})
export class PriseDeCommandePageModule {}
