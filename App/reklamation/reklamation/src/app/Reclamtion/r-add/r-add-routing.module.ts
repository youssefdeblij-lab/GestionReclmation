import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RAddPage } from './r-add.page';

const routes: Routes = [
  {
    path: '',
    component: RAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RAddPageRoutingModule {}
