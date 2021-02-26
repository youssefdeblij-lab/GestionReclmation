import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { FormsModule , ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ResoulutionPageRoutingModule } from './resoulution-routing.module';

import { ResoulutionPage } from './resoulution.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule ,

    IonicModule,
    ResoulutionPageRoutingModule
  ],
  declarations: [ResoulutionPage]
})
export class ResoulutionPageModule {}
