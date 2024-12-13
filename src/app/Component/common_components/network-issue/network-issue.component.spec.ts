import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkIssueComponent } from './network-issue.component';

describe('NetworkIssueComponent', () => {
  let component: NetworkIssueComponent;
  let fixture: ComponentFixture<NetworkIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkIssueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
