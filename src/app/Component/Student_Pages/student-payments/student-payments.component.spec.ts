import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPaymentsComponent } from './student-payments.component';

describe('StudentPaymentsComponent', () => {
  let component: StudentPaymentsComponent;
  let fixture: ComponentFixture<StudentPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
