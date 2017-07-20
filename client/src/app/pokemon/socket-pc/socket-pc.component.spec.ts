import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketPcComponent } from './socket-pc.component';

describe('SocketPcComponent', () => {
  let component: SocketPcComponent;
  let fixture: ComponentFixture<SocketPcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketPcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
