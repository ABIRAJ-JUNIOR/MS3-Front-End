import { TestBed } from '@angular/core/testing';

import { WindowAuthService } from './window-auth.service';

describe('WindowAuthService', () => {
  let service: WindowAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
