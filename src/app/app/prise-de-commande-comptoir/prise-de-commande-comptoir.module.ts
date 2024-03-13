import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriseDeCommandeComptoirPageRoutingModule } from './prise-de-commande-comptoir-routing.module';

import { PriseDeCommandeComptoirPage } from './prise-de-commande-comptoir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriseDeCommandeComptoirPageRoutingModule
  ],
  declarations: [PriseDeCommandeComptoirPage]
})
export class PriseDeCommandeComptoirPageModule {}
