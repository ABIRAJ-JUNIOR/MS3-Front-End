import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navebar01Component } from './navebar-01.component';

describe('Navebar01Component', () => {
  let component: Navebar01Component;
  let fixture: ComponentFixture<Navebar01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navebar01Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navebar01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
