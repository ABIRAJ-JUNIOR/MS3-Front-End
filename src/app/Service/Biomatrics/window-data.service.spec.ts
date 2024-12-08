import { TestBed } from '@angular/core/testing';

import { WindowDataService } from './window-data.service';

describe('WindowDataService', () => {
  let service: WindowDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
