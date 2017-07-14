import { TestBed, inject } from '@angular/core/testing';

import { PokedexService } from './pokedex.service';

describe('PokedexService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokedexService]
    });
  });

  it('should ...', inject([PokedexService], (service: PokedexService) => {
    expect(service).toBeTruthy();
  }));
});
