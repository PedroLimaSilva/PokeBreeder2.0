import { Component, OnInit } from '@angular/core';
import { PokemonCenterService } from './pokemon-center.service';

@Component({
  selector: 'pokemon-center',
  templateUrl: './pokemon-center.component.html',
  styleUrls: ['./pokemon-center.component.scss']
})
export class PokemonCenterComponent implements OnInit {

  pokemon_list: Array<any>;
  selected;

  constructor(
    private _pc: PokemonCenterService
  ) {
  }

  ngOnInit() {
    this._pc.getPokemon()
            .subscribe(
              data => this.pokemon_list = data,
              error => console.log(error),
              () => { console.log(this.pokemon_list) }
            );
  }

}
