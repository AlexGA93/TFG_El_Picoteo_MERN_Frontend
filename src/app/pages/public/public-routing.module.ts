import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from '../../guards/auth.guard';

const routes: Routes = [{
  path: '',
  // children routes
  // protected to redirect to dashboard if user is logged
  children: [
    // welcome
    { path: 'welcome' ,component: WelcomeComponent, pathMatch: 'full', canActivate: [authGuard]},
    // login
    { path: 'login', component: LoginComponent },
    // stock
    // TODO: Cambiar componente por el componente de Stock
    // { path: 'stock', component: LoginComponent },
    // default
    { path: '**', redirectTo: 'welcome' }
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
