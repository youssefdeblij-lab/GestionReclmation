import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleShowPage } from './single-show.page';

const routes: Routes = [
  {
    path: '',
    component: SingleShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleShowPageRoutingModule {}
