import { TestBed } from '@angular/core/testing';

import { PaymentDataService } from './payment-data.service';

describe('PaymentDataService', () => {
  let service: PaymentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
