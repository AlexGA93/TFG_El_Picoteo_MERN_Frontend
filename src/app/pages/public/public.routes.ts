import { Routes } from '@angular/router';

export const publicRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./welcome/welcome.routes').then((m) => m.welcomeFrontRoutes),
  },
  {
    path: '**',
    redirectTo: 'welcome',
  },
];

export default publicRoutes;
