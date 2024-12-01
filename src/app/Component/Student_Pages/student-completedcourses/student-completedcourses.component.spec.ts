import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCompletedcoursesComponent } from './student-completedcourses.component';

describe('StudentCompletedcoursesComponent', () => {
  let component: StudentCompletedcoursesComponent;
  let fixture: ComponentFixture<StudentCompletedcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCompletedcoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCompletedcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
