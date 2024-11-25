import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { payAuthGuard } from './pay-auth.guard';

describe('payAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => payAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
