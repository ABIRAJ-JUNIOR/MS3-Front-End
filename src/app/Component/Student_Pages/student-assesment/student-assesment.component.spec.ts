import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssesmentComponent } from './student-assesment.component';

describe('StudentAssesmentComponent', () => {
  let component: StudentAssesmentComponent;
  let fixture: ComponentFixture<StudentAssesmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAssesmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
