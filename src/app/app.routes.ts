import { Routes } from '@angular/router';
import { validTokenGuard } from './guards/valid-token.guard';
import { authGuard } from './guards/auth.guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const routes: Routes = [
    // public welcome path
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    // authentication routes
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then((module) => module.authRoutes),
    },
    // private routes
    {
        path: 'private',
        loadChildren: () => import('./pages/private/private.routes').then((m) => m.privateRoutes),
    },
    // invalid default routes
    { path: '**', redirectTo: 'welcome',pathMatch: 'full'  },
    
    { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];
