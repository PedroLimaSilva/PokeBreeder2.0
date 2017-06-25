import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'pc-detail',
  templateUrl: './pc-detail.component.html',
  styleUrls: ['./pc-detail.component.scss']
})
export class PcDetailComponent implements OnInit, OnChanges {

  @Input() pokemon;

  constructor() { }

  ngOnInit() {
    this.getPokemonDetails();
  }
  ngOnChanges(changes) {
    console.log(changes);
    if (changes['pokemon'] && !changes['pokemon'].firstChange) {
      this.getPokemonDetails();
    }
  }

  getLevel() {

  }

  pokemonString() {
    return JSON.stringify(this.pokemon);
  }

  getPokemonDetails() {
    let cachedDex = JSON.parse(localStorage.getItem('POKEDEX'));
    let cachedMon = cachedDex[Number(this.pokemon.dex) - 1];
    if (this.pokemon.exp >= 0) {
      this.pokemon.name = cachedMon.name;
      this.pokemon.types = cachedMon.types;
    }
  }
}
