import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadosCreateComponent } from './components/chamado/chamados-create/chamados-create.component';
import { clienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { clienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { clienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { clienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ColaboradorCreateComponent } from './components/colaborador/colaborador-create/colaborador-create.component';
import { ColaboradorDeleteComponent } from './components/colaborador/colaborador-delete/colaborador-delete.component';
import { ColaboradorListComponent } from './components/colaborador/colaborador-list/colaborador-list.component';
import { ColaboradorUpdateComponent } from './components/colaborador/colaborador-update/colaborador-update.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path:'', component: NavComponent, canActivate:[AuthGuard], children:[
      {path: 'home', component: HomeComponent},

      {path: 'colaboradores', component: ColaboradorListComponent},
      {path: 'colaboradores/create', component: ColaboradorCreateComponent},
      {path: 'colaboradores/update/:id', component: ColaboradorUpdateComponent},
      {path: 'colaboradores/delete/:id', component: ColaboradorDeleteComponent},

      {path: 'clientes', component: clienteListComponent},
      {path: 'clientes/create', component: clienteCreateComponent},
      {path: 'clientes/update/:id', component: clienteUpdateComponent},
      {path: 'clientes/delete/:id', component: clienteDeleteComponent},

      {path: 'chamados', component: ChamadoListComponent},
      {path: 'chamados/create', component: ChamadosCreateComponent},







    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
