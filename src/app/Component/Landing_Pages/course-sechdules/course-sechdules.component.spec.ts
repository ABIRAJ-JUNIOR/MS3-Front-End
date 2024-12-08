import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSechdulesComponent } from './course-sechdules.component';

describe('CourseSechdulesComponent', () => {
  let component: CourseSechdulesComponent;
  let fixture: ComponentFixture<CourseSechdulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSechdulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSechdulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
