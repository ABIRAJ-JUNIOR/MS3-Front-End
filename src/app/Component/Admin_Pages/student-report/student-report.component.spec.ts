import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReportComponent } from './student-report.component';

describe('StudentReportComponent', () => {
  let component: StudentReportComponent;
  let fixture: ComponentFixture<StudentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
