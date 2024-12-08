import { TestBed } from '@angular/core/testing';

import { MailServiceService } from './mail-service.service';

describe('MailServiceService', () => {
  let service: MailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
