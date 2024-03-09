import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriseDeCommandePageRoutingModule } from './prise-de-commande-routing.module';

import { PriseDeCommandePage } from './prise-de-commande.page';
import { PlatImageComponent } from '../plat-image/plat-image.component';
import { PriseDeCommandeQuantiteComponent } from '../prise-de-commande-quantite/prise-de-commande-quantite.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriseDeCommandePageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [PriseDeCommandePage, PlatImageComponent, PriseDeCommandeQuantiteComponent]
})
export class PriseDeCommandePageModule {}
