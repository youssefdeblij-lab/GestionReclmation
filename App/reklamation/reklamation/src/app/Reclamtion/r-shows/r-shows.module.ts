import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RShowsPageRoutingModule } from './r-shows-routing.module';

import { RShowsPage } from './r-shows.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RShowsPageRoutingModule
  ],
  declarations: [RShowsPage]
})
export class RShowsPageModule {}
