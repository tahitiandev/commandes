import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenusPageRoutingModule } from './menus-routing.module';

import { MenusPage } from './menus.page';
import { PlatPostComponent } from '../plat-post/plat-post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenusPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [MenusPage, PlatPostComponent]
})
export class MenusPageModule {}
