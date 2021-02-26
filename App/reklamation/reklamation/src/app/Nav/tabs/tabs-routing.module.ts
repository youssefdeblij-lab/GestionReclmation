import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [ 
      {
      path: 'home',
      loadChildren: () => import('../../home/home.module').then( m => m.HomePageModule)
    },
    {
      path: 'Radd',
      loadChildren: () => import('../../Reclamtion/r-add/r-add.module').then( m => m.RAddPageModule)
    },
    {
      path: 'Rshow',
      loadChildren: () => import('../../Reclamtion/r-shows/r-shows.module').then( m => m.RShowsPageModule)
  
    },
    {
      path: 'info',
      loadChildren: () => import('../../Utils/info/info.module').then( m => m.InfoPageModule)
    },
   
    {
      path: 'deconnexion',
      loadChildren: () => import('../../Utils/deconnexion/deconnexion.module').then( m => m.DeconnexionPageModule)
    },
    {
      path: '',
      redirectTo: '/tabs/home',
      pathMatch: 'full'
    }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
