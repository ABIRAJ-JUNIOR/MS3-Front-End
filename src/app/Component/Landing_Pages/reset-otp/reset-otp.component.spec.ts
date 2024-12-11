import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetOtpComponent } from './reset-otp.component';

describe('ResetOtpComponent', () => {
  let component: ResetOtpComponent;
  let fixture: ComponentFixture<ResetOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
