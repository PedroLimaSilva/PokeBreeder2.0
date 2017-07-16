import { TestBed, inject } from '@angular/core/testing';

import { PokemonCenterService } from './pokemon-center.service';

describe('PokemonCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonCenterService]
    });
  });

  it('should ...', inject([PokemonCenterService], (service: PokemonCenterService) => {
    expect(service).toBeTruthy();
  }));
});
