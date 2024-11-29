import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentcommonProfileComponent } from './studentcommon-profile.component';

describe('StudentcommonProfileComponent', () => {
  let component: StudentcommonProfileComponent;
  let fixture: ComponentFixture<StudentcommonProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentcommonProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentcommonProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
