import { Routes } from "@angular/router";
import { authGuard } from "../../guards/auth.guard";
import { PrivateLayoutComponent } from "./layouts/private-layout/private-layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RecetasComponent } from "./recetas/recetas.component";
import { StockComponent } from "./stock/stock.component";
import { InventarioComponent } from "./inventario/inventario.component";
import { VentasComponent } from "./ventas/ventas.component";
import { GastosComponent } from "./gastos/gastos.component";
// import {InventarioComponent} from "./inventario/inventario.component";

export const privateRoutes: Routes = [
    // Welcome page
    {
        path: '',
        component: PrivateLayoutComponent,
        canActivate: [authGuard],
        canMatch: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },

            // recetas
            { path: 'recetas', component: RecetasComponent },

            // stock
            { path: 'stock', component: StockComponent },

            // inventario
            { path: 'inventario', component: InventarioComponent },
            
            // ventas
            { path: 'ventas', component: VentasComponent },

            // gastos
            { path: 'gastos', component: GastosComponent },

            // default
            { path: '**', redirectTo: 'dashboard' }
        ]
    },
];
