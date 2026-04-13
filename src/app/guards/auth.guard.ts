import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  // * If user is authenticated we want to redirect to dashboard as default page
  // * We wan't to be capable of access to login if we're logged

  if (authService.isAuthenticated()) {
    console.log('User is authenticated, allowing access to the route');
    return true;
  } else {
    console.log('User is not authenticated, redirecting to /public/auth/login');
    router.navigate(['/public/auth/login']);
    return false;
  }
};
