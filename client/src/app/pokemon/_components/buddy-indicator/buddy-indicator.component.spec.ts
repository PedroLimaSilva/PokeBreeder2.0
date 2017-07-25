import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyIndicatorComponent } from './buddy-indicator.component';

describe('BuddyIndicatorComponent', () => {
  let component: BuddyIndicatorComponent;
  let fixture: ComponentFixture<BuddyIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuddyIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuddyIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
