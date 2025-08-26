import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

export const authRoutes: Routes = [
    // Auth page
    {
        path: '',
        children: [
            { path: 'login', component: LoginComponent },
            // default
            { path: '**', redirectTo: 'login' }
        ]
    },
];