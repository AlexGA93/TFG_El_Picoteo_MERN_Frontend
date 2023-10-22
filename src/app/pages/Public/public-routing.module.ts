import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [{
  path: '',
  // children routes
  children: [
    // welcome
    { path: 'welcome' ,component: WelcomeComponent},
    // login
    { path: 'login', component: LoginComponent },
    // default
    { path: '**', redirectTo: 'welcome' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
