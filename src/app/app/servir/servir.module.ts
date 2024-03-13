import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServirPageRoutingModule } from './servir-routing.module';

import { ServirPage } from './servir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServirPageRoutingModule
  ],
  declarations: [ServirPage]
})
export class ServirPageModule {}
