import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventarioComponent } from './inventario/inventario.component';
import { RecetasComponent } from './recetas/recetas.component';

const routes: Routes = [{
  path: '',
  children: [
    // dashboard
    { path: 'dashboard', component: DashboardComponent },
    // inventario
    { path: 'inventario', component: InventarioComponent },
    // recetas
    { path: 'recetas', component: RecetasComponent },
    // default
    { path: '**', redirectTo: 'dashboard' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
