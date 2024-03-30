import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  children: [
    // dashboard
    { path: 'dashboard', component: DashboardComponent },
    // inventario
    { path: 'inventario', component: DashboardComponent },
    // recetas
    { path: 'recetas', component: DashboardComponent },
    // default
    { path: '**', redirectTo: 'dashboard' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
