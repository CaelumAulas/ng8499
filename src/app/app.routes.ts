import { Routes, RouterModule } from "@angular/router";
import { CaixaDeEntradaComponent } from './modules/caixa-de-entrada/caixa-de-entrada.component';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { LoginComponent } from './modules/login/login.component';

const rotasApp:Routes = [
  {path: '', component: CaixaDeEntradaComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/:username', component: LoginComponent},
  {path: '**', redirectTo: ''}
];

export const ModuloRoteamento = RouterModule.forRoot(rotasApp);
