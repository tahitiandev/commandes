import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenusPageRoutingModule } from './menus-routing.module';

import { MenusPage } from './menus.page';
import { PlatPostComponent } from '../plat-post/plat-post.component';
import { PlatPutComponent } from '../plat-put/plat-put.component';
import { PlatImageComponent } from '../plat-image/plat-image.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenusPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [MenusPage, PlatPostComponent, PlatPutComponent, PlatImageComponent]
})
export class MenusPageModule {}
