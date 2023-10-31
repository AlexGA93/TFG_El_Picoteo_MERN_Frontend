import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validTokenGuard } from './valid-token.guard';

describe('validTokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validTokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
