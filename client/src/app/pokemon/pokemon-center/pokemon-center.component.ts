import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'pokemon-center',
  templateUrl: './pokemon-center.component.html',
  styleUrls: ['./pokemon-center.component.scss']
})
export class PokemonCenterComponent implements OnInit {

  pokemon_list: Array<any> = [];
  selected;

  constructor(
    private _pkmn: PokemonService
  ) {
  }

  ngOnInit() {
    this._pkmn.obsInventory
              .subscribe(
                data => {
                  this.pokemon_list = data;
                }
              );
    this._pkmn.getPokemon()
              .subscribe(
                data => this.pokemon_list = data,
                error => console.log(error),
                () => { }
              );
  }

}
