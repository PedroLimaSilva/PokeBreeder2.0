import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureListComponent } from './adventure-list.component';

describe('AdventureListComponent', () => {
  let component: AdventureListComponent;
  let fixture: ComponentFixture<AdventureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
