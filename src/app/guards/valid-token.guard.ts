import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const validTokenGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).verifyToken().pipe(map(result => result));
};
