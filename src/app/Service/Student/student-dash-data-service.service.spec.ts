import { TestBed } from '@angular/core/testing';

import { StudentDashDataServiceService } from './student-dash-data-service.service';

describe('StudentDashDataServiceService', () => {
  let service: StudentDashDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDashDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
