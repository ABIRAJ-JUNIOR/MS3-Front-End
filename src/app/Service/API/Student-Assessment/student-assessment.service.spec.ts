import { TestBed } from '@angular/core/testing';

import { StudentAssessmentService } from './student-assessment.service';

describe('StudentAssessmentService', () => {
  let service: StudentAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
