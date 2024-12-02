import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsOverviewComponent } from './payments-overview.component';

describe('PaymentsOverviewComponent', () => {
  let component: PaymentsOverviewComponent;
  let fixture: ComponentFixture<PaymentsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
