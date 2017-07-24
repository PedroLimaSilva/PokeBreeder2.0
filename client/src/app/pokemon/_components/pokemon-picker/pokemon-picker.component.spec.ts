import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonPickerComponent } from './pokemon-picker.component';

describe('PokemonPickerComponent', () => {
  let component: PokemonPickerComponent;
  let fixture: ComponentFixture<PokemonPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
