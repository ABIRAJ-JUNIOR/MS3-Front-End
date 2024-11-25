import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpAuthenticationComponent } from './otp-authentication.component';

describe('OtpAuthenticationComponent', () => {
  let component: OtpAuthenticationComponent;
  let fixture: ComponentFixture<OtpAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpAuthenticationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
