import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {PokemonService} from '../../pokemon.service';

@Component({
  selector: 'pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {

  @Input() pokemon;
  @Input() selectable = false;
  @Input() selected = false;
  @Output() onSelect = new EventEmitter();

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

  cliked(){
    this.selected = !this.selected;
    if (this.selected) {
      this.onSelect.emit(this.selected);
    }
  }

}
