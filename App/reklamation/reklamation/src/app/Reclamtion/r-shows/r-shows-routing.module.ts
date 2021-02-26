import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RShowsPage } from './r-shows.page';

const routes: Routes = [
  {
    path: '',
    component: RShowsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RShowsPageRoutingModule {}
