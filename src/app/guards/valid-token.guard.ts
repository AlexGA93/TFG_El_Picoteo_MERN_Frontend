import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const validTokenGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const authService = inject(AuthenticationService);



  // return inject(AuthenticationService).verifyToken().pipe(map(result => result));
  return authService.verifyToken().pipe(
    map(result => {
      if (!result) {
        // Si el resultado es falso, se redirige al login y se limpia el localStorage
        localStorage.removeItem('user'); // Borrar del localStorage
        router.navigate(['/login']); // Redirigir al login
      }
      return result; // Si la verificación es exitosa, permite el acceso
    }),
    catchError((err) => {
      // Manejo de errores, en caso de que la llamada falle
      console.error('Token verification failed', err);
      localStorage.removeItem('user'); // Limpiar el localStorage en caso de error
      router.navigate(['/login']); // Redirigir al login
      return of(false); // Impide el acceso a la ruta protegida
    })
  );
};
