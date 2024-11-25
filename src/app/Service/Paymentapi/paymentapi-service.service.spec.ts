import { TestBed } from '@angular/core/testing';

import { PaymentapiServiceService } from './paymentapi-service.service';

describe('PaymentapiServiceService', () => {
  let service: PaymentapiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentapiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
