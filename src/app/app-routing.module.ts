import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'tables',
    loadChildren: () => import('./app/tables/tables.module').then( m => m.TablesPageModule)
  },
  {
    path: 'prise-de-commande',
    loadChildren: () => import('./app/prise-de-commande/prise-de-commande.module').then( m => m.PriseDeCommandePageModule)
  },
  {
    path: 'prise-de-commande/:id',
    loadChildren: () => import('./app/prise-de-commande/prise-de-commande.module').then( m => m.PriseDeCommandePageModule)
  },
  {
    path: 'menus',
    loadChildren: () => import('./app/menus/menus.module').then( m => m.MenusPageModule)
  },
  {
    path: 'comptoir',
    loadChildren: () => import('./app/prise-de-commande-comptoir/prise-de-commande-comptoir.module').then( m => m.PriseDeCommandeComptoirPageModule)
  },
  {
    path: 'preparations',
    loadChildren: () => import('./app/preparations/preparations.module').then( m => m.PreparationsPageModule)
  },
  {
    path: 'servir',
    loadChildren: () => import('./app/servir/servir.module').then( m => m.ServirPageModule)
  },
  {
    path: 'a-regler',
    loadChildren: () => import('./app/commande-terminee/commande-terminee.module').then( m => m.CommandeTermineePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
