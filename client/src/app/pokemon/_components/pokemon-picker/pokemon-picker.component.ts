import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'pokemon-picker',
  templateUrl: './pokemon-picker.component.html',
  styleUrls: ['./pokemon-picker.component.scss']
})
export class PokemonPickerComponent implements OnInit {

  @Input() pokemon:any;
  @Output() onSelect = new EventEmitter();
  @Output() onDismiss = new EventEmitter();

  availablePkmn = [];

  constructor(
    private _pkmn: PokemonService
  ) { }

  ngOnInit() {
    this.availablePkmn = this._pkmn.getAvailablePkmn(this.pokemon);
  }


  selectPokemon(pokemon){
    this.onSelect.emit(pokemon);
  }

  dismiss(){
    this.onDismiss.emit();
  }
}
