import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RAddPageRoutingModule } from './r-add-routing.module';

import { RAddPage } from './r-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule ,
    IonicModule, 
    RAddPageRoutingModule
  ],
  declarations: [RAddPage]
})
export class RAddPageModule {}
