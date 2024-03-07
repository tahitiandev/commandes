import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablesPageRoutingModule } from './tables-routing.module';

import { TablesPage } from './tables.page';
import { TablesPostComponent } from '../tables-post/tables-post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablesPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [TablesPage, TablesPostComponent]
})
export class TablesPageModule {}
