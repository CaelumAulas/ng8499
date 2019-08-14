import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { SharedComponentsModule } from './components/shared-components.module';

const rotasApp:Routes = [
  {
    path: 'cadastro',
    loadChildren: () => import('./modules/cadastro/cadastro.module').then(m => m.CadastroModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'login/:username',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/caixa-de-entrada/caixa-de-entrada.module').then(m => m.CaixaDeEntradaModule)
    ,pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
    ,pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(rotasApp)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
