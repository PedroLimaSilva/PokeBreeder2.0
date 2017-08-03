import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureAssignComponent } from './adventure-assign.component';

describe('AdventureAssignComponent', () => {
  let component: AdventureAssignComponent;
  let fixture: ComponentFixture<AdventureAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventureAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
