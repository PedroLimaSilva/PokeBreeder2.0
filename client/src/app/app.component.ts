import { Component, OnInit } from '@angular/core';

import { PokeAPIService } from './services/poke-api.service';
import { PokemonService } from './pokemon/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private alive = true;

  public inventory = [];

  constructor(
    private _pokeAPI: PokeAPIService,
    private _pkmn: PokemonService
  ) {
  }

  ngOnInit() {
    // this._pokeAPI.getPokedex(151);
    this._pkmn.ngOnInit();
    this._pkmn.obsInventory
                        .subscribe(
                          data => {
                            this.inventory = data;
                            // this.startThreads();
                          }
                        );
  }


  startThreads(){
    for (var i = 0; i < this.inventory.length; i++) {
      var element = this.inventory[i];
      if(element.mate){
        setTimeout(
          () => {
            for(;;){
              setTimeout(
                () => {
                  console.log(element._id);
                },
                1000
              );
            }
          }
        );
      }
    }
  }

}
