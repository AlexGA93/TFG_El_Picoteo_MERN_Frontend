import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { authGuard } from "../../guards/auth.guard";

export const publicRoutes: Routes = [
    // Welcome page
    {
        path: 'welcome',
        component: WelcomeComponent,
        pathMatch: 'full', 
        canActivate: [authGuard]
    },
    // Login Page
    {
        path: 'login',
        component: LoginComponent,
    },
    // Default route
    {
        path: '**',
        redirectTo: 'welcome',
    }
];