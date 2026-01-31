import { Routes } from '@angular/router';

export const routes: Routes = [

    // welcome path
    {
        // default path
        path: '',
        loadChildren: () => import('./welcome/welcome.routes').then((m) => m.welcomeFrontRoutes),
    },
    // authentication parent path
    {
        // default path
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
    },
    // private parent path
    {
        path: 'private',
        loadChildren: () => import('./pages/private/private.routes').then((m) => m.privateRoutes),
    },
    // default path
    {
        path: '**',
        redirectTo: '',
    }
];
