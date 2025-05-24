import { Routes } from '@angular/router';
import { validTokenGuard } from './guards/valid-token.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    // public routes - Welcome and Login
    {
        path: 'public', 
        loadChildren: () => import('./pages/public/public.routes').then((module) => module.publicRoutes)
    },
    // private routes
    {
        path: 'private',
        loadChildren: () => import('./pages/private/private.module').then((module) => module.PrivateModule),
        // guard to protect private routes if there is no login token
        canActivate: [validTokenGuard],
        canMatch: [validTokenGuard]
    },
    // default routes
    { path: '**', redirectTo: 'public' }
];
