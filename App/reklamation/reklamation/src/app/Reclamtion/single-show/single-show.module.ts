import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleShowPageRoutingModule } from './single-show-routing.module';

import { SingleShowPage } from './single-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleShowPageRoutingModule
  ],
  declarations: [SingleShowPage]
})
export class SingleShowPageModule {}
