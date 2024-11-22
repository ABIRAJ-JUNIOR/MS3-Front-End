import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseScheduleComponent } from './course-schedule.component';

describe('CourseScheduleComponent', () => {
  let component: CourseScheduleComponent;
  let fixture: ComponentFixture<CourseScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
