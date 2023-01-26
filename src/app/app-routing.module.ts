import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'deposito', 
    loadChildren: () => import('./deposito-municipal/deposito-municipal.module').then(m => m.DepositoMunicipalModule)
  },
  {
    path: 'tui', 
    loadChildren: () => import('./tui/tui.module').then(m => m.TuiModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
