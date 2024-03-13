import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriseDeCommandePageRoutingModule } from './prise-de-commande-routing.module';

import { PriseDeCommandePage } from './prise-de-commande.page';
import { PriseDeCommandeQuantiteComponent } from '../prise-de-commande-quantite/prise-de-commande-quantite.component';
import { PlatImage2Component } from '../plat-image2/plat-image2.component';
import { PanierComponent } from '../panier/panier.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriseDeCommandePageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [PriseDeCommandePage, PlatImage2Component, PriseDeCommandeQuantiteComponent, PanierComponent]
})
export class PriseDeCommandePageModule {}
