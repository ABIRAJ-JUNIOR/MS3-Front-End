import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFeedbacksComponent } from './course-feedbacks.component';

describe('CourseFeedbacksComponent', () => {
  let component: CourseFeedbacksComponent;
  let fixture: ComponentFixture<CourseFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFeedbacksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
