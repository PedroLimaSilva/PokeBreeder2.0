import { Component, OnInit } from '@angular/core';

import { PokeAPIService } from './services/poke-api.service';
import { PokemonService } from './pokemon/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _pokeAPI: PokeAPIService,
    private _pokemonService: PokemonService
  ) {
  }

  ngOnInit() {
    // this._pokeAPI.getPokedex(151);
    this._pokemonService.ngOnInit();
    this._pokemonService.obsInventory
                        .subscribe(
                          data => console.log('inventory updated')
                        );
  }
}
