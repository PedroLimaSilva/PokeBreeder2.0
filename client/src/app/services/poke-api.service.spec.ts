import { TestBed, inject } from '@angular/core/testing';

import { PokeAPIService } from './poke-api.service';

describe('PokeAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokeAPIService]
    });
  });

  it('should ...', inject([PokeAPIService], (service: PokeAPIService) => {
    expect(service).toBeTruthy();
  }));
});
