import { TestBed } from '@angular/core/testing';

import { OtpVerficationService } from './otp-verfication.service';

describe('OtpVerficationService', () => {
  let service: OtpVerficationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpVerficationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
