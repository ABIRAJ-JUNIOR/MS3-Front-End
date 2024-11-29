import { TestBed } from '@angular/core/testing';

import { PatmentService } from './patment.service';

describe('PatmentService', () => {
  let service: PatmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
