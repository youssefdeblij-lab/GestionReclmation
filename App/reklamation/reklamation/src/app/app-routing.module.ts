import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'r-shows',
    loadChildren: () => import('./Reclamtion/r-shows/r-shows.module').then( m => m.RShowsPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./Utils/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'r-add',
    loadChildren: () => import('./Reclamtion/r-add/r-add.module').then( m => m.RAddPageModule)
  },
  {
    path: 'deconnexion',
    loadChildren: () => import('./Utils/deconnexion/deconnexion.module').then( m => m.DeconnexionPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./Nav/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'single-show/:id',
    loadChildren: () => import('./Reclamtion/single-show/single-show.module').then( m => m.SingleShowPageModule)
  },
  {
    path: 'resoulution/:id',
    loadChildren: () => import('./Reclamtion/resoulution/resoulution.module').then( m => m.ResoulutionPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./Utils/edit/edit.module').then( m => m.EditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
