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
    // default path









    // public welcome path
    // {
    //     path: 'welcome',
    //     component: WelcomeComponent
    // },
    // // authentication routes
    // {
    //     path: 'auth',
    //     loadChildren: () => import('./pages/auth/auth.routes').then((module) => module.authRoutes),
    // },
    // // private routes
    // {
    //     path: 'private',
    //     loadChildren: () => import('./pages/private/private.routes').then((m) => m.privateRoutes),
    // },
    // // invalid default routes
    // { path: '**', redirectTo: 'welcome',pathMatch: 'full'  },
    
    // { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];
