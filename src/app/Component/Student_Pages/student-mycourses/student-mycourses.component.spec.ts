import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMycoursesComponent } from './student-mycourses.component';

describe('StudentMycoursesComponent', () => {
  let component: StudentMycoursesComponent;
  let fixture: ComponentFixture<StudentMycoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMycoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMycoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
