import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAuthenticationComponent } from './payment-authentication.component';

describe('PaymentAuthenticationComponent', () => {
  let component: PaymentAuthenticationComponent;
  let fixture: ComponentFixture<PaymentAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentAuthenticationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
