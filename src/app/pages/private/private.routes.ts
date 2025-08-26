import { Routes } from "@angular/router";
import { authGuard } from "../../guards/auth.guard";
import { PrivateLayoutComponent } from "./layouts/private-layout/private-layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const privateRoutes: Routes = [
    // Welcome page
    {
        path: '',
        component: PrivateLayoutComponent,
        canActivate: [authGuard],
        canMatch: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            // inventario
            // { path: 'inventario', component: InventarioComponent },
            // recetas
            // { path: 'recetas', component: RecetasComponent },
            // default
            { path: '**', redirectTo: 'dashboard' }
        ]
    },
];