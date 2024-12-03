import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAnnouncementComponent } from './view-all-announcement.component';

describe('ViewAllAnnouncementComponent', () => {
  let component: ViewAllAnnouncementComponent;
  let fixture: ComponentFixture<ViewAllAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllAnnouncementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
