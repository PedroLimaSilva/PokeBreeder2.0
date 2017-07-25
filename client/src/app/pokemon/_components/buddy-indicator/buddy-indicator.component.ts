import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'buddy-indicator',
  templateUrl: './buddy-indicator.component.html',
  styleUrls: ['./buddy-indicator.component.scss']
})
export class BuddyIndicatorComponent implements OnInit {

  @Input() pokemon;

  constructor(
    private _pkmn: PokemonService
  ) { }

  ngOnInit() {
    this._pkmn.getPokemonSprite(this.pokemon);
  }

}
