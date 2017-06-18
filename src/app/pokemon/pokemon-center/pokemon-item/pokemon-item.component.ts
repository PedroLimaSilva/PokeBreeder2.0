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
    this.pokemon['sprite'] = this.getPokemonSprite(this.pokemon);
  }

  getPokemonSprite(pokemon){
    if (pokemon.exp >= 0) {
      return 'assets/img/sprites/pokemon/' + pokemon.dex + '/' + pokemon.dex + '.gif';
    } else {
      return 'assets/img/sprites/egg.gif';
    }
  }

}
