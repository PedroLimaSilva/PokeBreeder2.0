import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {

  @Input() pokemon;

  constructor() { }

  ngOnInit() {
    this.getPokemonSprite(this.pokemon);
  }

  getPokemonSprite(pokemon) {
    this.pokemon['sprite'] = 'assets/img/sprites/pokemon/' + pokemon.dex_entry.dex + '/' + pokemon.dex_entry.dex + '.gif';
    this.pokemon['egg_sprite'] = 'assets/img/sprites/egg.gif';
  }

  getPokemonName() {
    let cachedDex = JSON.parse(localStorage.getItem('POKEDEX'));
    let cachedMon = cachedDex[Number(this.pokemon.dex_entry.dex) - 1];
    if (this.pokemon.exp >= 0){
      this.pokemon.name = cachedMon.name;
    }
  }

}
