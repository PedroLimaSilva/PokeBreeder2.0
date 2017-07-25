import { Component, OnInit, Input } from '@angular/core';

import {PokemonService} from '../../pokemon.service';

@Component({
  selector: 'pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {

  @Input() pokemon;

  constructor(private _pkmn: PokemonService) { }

  ngOnInit() {
    this._pkmn.getPokemonSprite(this.pokemon);
  }

  getPokemonName() {
    let cachedDex = JSON.parse(localStorage.getItem('POKEDEX'));
    let cachedMon = cachedDex[Number(this.pokemon.dex_entry.dex) - 1];
    if (this.pokemon.exp >= 0){
      this.pokemon.name = cachedMon.name;
    }
  }

}
