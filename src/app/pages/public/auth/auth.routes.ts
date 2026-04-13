import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "../layouts/auth-layout/auth-layout.component";
import { LoginComponent } from "./pages/login/login.component";

export const authRoutes: Routes = [
    {
        // only one route, default
        path: '',
        // component of layout
        component: AuthLayoutComponent,
        // child routes - pages
        children: [
            {
                // default route - login
                path: 'login',
                component: LoginComponent
            },
            // {
            //     // auth route - register
            //     path: 'register',
            //     component: RegisterComponent
            // },
            // default page
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    }
];

export default authRoutes;
