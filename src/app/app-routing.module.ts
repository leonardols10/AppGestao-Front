import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
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
      {path: 'colaboradores/delete/:id', component: ColaboradorDeleteComponent}




    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
