import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{
  path: '',
  // children routes
  children: [
    // login
    { path: 'login', component: LoginComponent },
    // register
    { path: 'register', component: RegisterComponent },
    // default
    { path: '**', redirectTo: 'login' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
