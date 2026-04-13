import { Routes } from '@angular/router';

export const routes: Routes = [
    // private parent path
    {
        path: 'private',
        loadChildren: () => import('./pages/private/private.routes').then((m) => m.privateRoutes),
    },
    // public parent path
    {
        path: 'public',
        loadChildren: () => import('./pages/public/public.routes').then((m) => m.publicRoutes),
    },
    // default path
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'public/welcome',
    },
    // default path
    {
        path: '**',
        redirectTo: 'public/welcome',
    }
];
