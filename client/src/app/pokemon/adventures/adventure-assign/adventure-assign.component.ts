import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'adventure-assign',
  templateUrl: './adventure-assign.component.html',
  styleUrls: ['./adventure-assign.component.scss']
})
export class AdventureAssignComponent implements OnInit, OnDestroy {

  private alive = true;

  @Input() adventure;

  showAvailable = false;

  public availablePokemon = [];
  public selectedPokemon = [];

  public selected: any;

  public successRate: Number = 0;

  constructor(
    private _pkmn: PokemonService
  ) { }

  ngOnInit() {
    this.availablePokemon = this._pkmn.getAvailablePkmn({ _id: "" });
    this._pkmn.obsInventory
              .takeWhile(() => this.alive)
              .subscribe(
                inventory => {
                  console.log('available pokemon heard ')
                  this.availablePokemon = this._pkmn.getAvailablePkmn({_id:""});
                  this.availablePokemon.forEach(element => {
                    this.selectedPokemon.push(false);
                  });
                }
              );
  }

  selectPokemon(pokemon: any) {
    let availableClone = JSON.parse(JSON.stringify(this.availablePokemon));
    let index = availableClone.map((element) => { return element._id; }).indexOf(pokemon._id);
    for (let i = 0; i < this.availablePokemon.length; i++) {
      if(i===index){
        this.selectedPokemon[i] = true;
        this.selected = this.availablePokemon[i];
        this.successRate = this.getSuccessRate();
      }
      else{
        this.selectedPokemon[i] = false;
      }
    }
  }

  getSuccessRate() {
    let res = 0;
    // Lvl Difference calculation
    let lvlDiff = this.selected.lvl - this.adventure.lvl;
    if(lvlDiff > 10){
      res = 100;
    }
    else if(lvlDiff < -10){
      res = 0;
    }
    else{
      res = 5*lvlDiff + 50;
    }

    //Type advantages
    let typeAdvantages: Array<String> = this.adventure.recTypes;
    let typeDisadvantages: Array<String> = this.adventure.avoidTypes;
    let pokemonTypes: Array<String> = this.selected.dex_entry.types;

    let typeAdvantage = false;
    let typeDisadvantage = false;
    pokemonTypes.forEach(type => {
      typeAdvantages.forEach(recommended => {
        if (type.toLowerCase() === recommended.toLowerCase()) {
          typeAdvantage = true;
        }
      });
      typeDisadvantages.forEach(disavowed => {
        if (type.toLowerCase() === disavowed.toLowerCase()) {
          typeDisadvantage = true;
        }
      });
    });

    if(typeDisadvantage){
      res -= 30;
    }
    if(typeAdvantage){
      res += 30;
    }

    // CLAMP RATE
    if(res > 100){
      return 100;
    }
    if(res < 0){
      return 0;
    }
    return res;
  }

  confirm() {}

  ngOnDestroy() {
    this.alive = false;
  }

}
