import { Routes } from "@angular/router";
import { authGuard } from "../../guards/auth.guard";
import { PrivateLayoutComponent } from "./layouts/private-layout/private-layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { StockComponent } from "./stock/stock.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { SalesComponent } from "./sales/sales.component";
import { ExpensesComponent } from "./exxpenses/expenses.component";
import { DinningRoom } from "./dinning-room/dinning-room.component";
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
            { path: 'recetas', component: RecipesComponent },

            // stock
            { path: 'stock', component: StockComponent },

            // inventario
            { path: 'inventario', component: InventoryComponent },
            
            // ventas
            { path: 'ventas', component: SalesComponent },

            // gastos
            { path: 'gastos', component: ExpensesComponent },

            // Dinning Room
            { path: 'dinning-room', component: DinningRoom },

            // default
            { path: '**', redirectTo: 'dashboard' }
        ]
    },
];
