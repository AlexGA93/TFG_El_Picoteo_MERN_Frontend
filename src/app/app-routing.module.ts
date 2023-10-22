import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // authentication
  {
    path: 'public',
    loadChildren: () => import('./pages/Public/public.module').then(module => module.PublicModule)
  },
  // protected routes
  { 
    path: 'private',
    loadChildren: () => import('./pages/Private/private.module').then(module => module.PrivateModule) 
  },
  // default routes
  {
    path: '**',
    redirectTo: 'public'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
