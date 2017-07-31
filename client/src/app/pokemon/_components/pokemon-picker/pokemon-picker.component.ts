import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'pokemon-picker',
  templateUrl: './pokemon-picker.component.html',
  styleUrls: ['./pokemon-picker.component.scss']
})
export class PokemonPickerComponent implements OnInit {

  @Input() pokemon:any;
  @Input() eggs = false;
  @Output() onSelect = new EventEmitter();
  @Output() onDismiss = new EventEmitter();

  private show = false;

  availablePkmn = [];

  constructor(
    private _pkmn: PokemonService
  ) { }

  ngOnInit() {
    if(this.eggs)
      this.availablePkmn = this._pkmn.getAvailableEggs(this.pokemon);
    else
      this.availablePkmn = this._pkmn.getAvailablePkmn(this.pokemon);

    setTimeout(
      ()=>{
        this.show = true;
      },
      50
    );
  }


  selectPokemon(pokemon){
    this.onSelect.emit(pokemon);
    this.show = false;
  }

  dismiss(){
    this.show = false;
    setTimeout(
      ()=>{
        this.onDismiss.emit();
      },
      300
    );
  }
}
