import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const validTokenGuard: CanActivateFn = () => {
  return inject(AuthService).verifyToken().pipe(map(result => result));
};
