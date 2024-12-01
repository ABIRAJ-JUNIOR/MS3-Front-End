import { TestBed } from '@angular/core/testing';

import { StudentDashDataService } from './student-dash-data.service';

describe('StudentDashDataService', () => {
  let service: StudentDashDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDashDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
