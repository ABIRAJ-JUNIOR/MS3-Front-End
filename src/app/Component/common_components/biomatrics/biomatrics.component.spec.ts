import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomatricsComponent } from './biomatrics.component';

describe('BiomatricsComponent', () => {
  let component: BiomatricsComponent;
  let fixture: ComponentFixture<BiomatricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiomatricsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiomatricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
