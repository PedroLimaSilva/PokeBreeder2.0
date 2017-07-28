import { Component, OnInit, OnDestroy } from '@angular/core';

import { PokemonService } from './pokemon/pokemon.service';
import { PokedexService } from './pokemon/pokedex/pokedex.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private alive = true;

  public inventory = [];

  constructor(
    private _dex: PokedexService,
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
                }
              );
    this._pkmn.expChanged
              .subscribe(
                pokemon =>{
                  this.saveEXP(pokemon);
                }
              );
    this._pkmn.lvlUp
        .takeWhile(() => this.alive)
        .subscribe(
          pokemon => {
            let inventoryClone = JSON.parse(JSON.stringify(this.inventory));
            let index = inventoryClone.map( (element) => { return element._id; }).indexOf(pokemon._id);
            if(index >= 0 && pokemon.lvl < 100)
              this.levelUp(index);
          }
        );
    this.startLoops();
  }

  private findPokemon(pokemon) {

  }

  startLoops(){
    let mainExpLoop = setInterval(
      () => {
        this.buddyExp();
      },
      1000
    );
  }

  buddyExp() {
    for (var i = 0; i < this.inventory.length; i++) {
      if(this.inventory[i].lvl < 100 && this.inventory[i].mate){
        let expGain = this._pkmn.expGainMate(this.inventory[i].mate);
        this.inventory[i].exp += expGain;
        this.inventory[i].next_lvl -= expGain;
        if (this.inventory[i].next_lvl <= 0) {
          this._pkmn.lvlUp.next(this.inventory[i]);
        }
        this._pkmn.obsInventory.next(this.inventory);
      }
    }
  }

  levelUp(pkmnIndex: any) {
    this.inventory[pkmnIndex].lvl++;
    let lvlInfo;
    if (this.inventory[pkmnIndex].lvl === 1) {
      this._dex.updateDex(this.inventory[pkmnIndex].dex)
                          .takeWhile(() => this.alive)
                          .subscribe(
                            data => console.log('saved dex:', this.inventory[pkmnIndex].dex)
                          );
    }
    if(this.inventory[pkmnIndex].lvl <= 100){
      this._pkmn.getLvlInfo(this.inventory[pkmnIndex].lvl)
                .takeWhile(() => this.alive)
                .subscribe(
                  data => lvlInfo = data,
                  error => console.log(error),
                  () => {
                    if(this.inventory[pkmnIndex].lvl < 100){
                      this.inventory[pkmnIndex].next_lvl = lvlInfo.next_lvl[this.inventory[pkmnIndex].dex_entry.exp_group];
                    }
                    else{
                      this.inventory[pkmnIndex].next_lvl = 0;
                    }
                    this.inventory[pkmnIndex].exp = lvlInfo.total[this.inventory[pkmnIndex].dex_entry.exp_group];
                    this._pkmn.expChanged.next(this.inventory[pkmnIndex]);
                    this.inventory[pkmnIndex].leveling_up = false;
                    this._pkmn.obsInventory.next(this.inventory);
                    if(!this.inventory[pkmnIndex].evolution){
                      this._pkmn.getEvolution(this.inventory[pkmnIndex])
                                .takeWhile(() => this.alive)
                                .subscribe(
                                  data => {
                                    this.inventory[pkmnIndex].evolution = data;
                                  },
                                  error => console.log(error),
                                  () => {
                                    if(this.inventory[pkmnIndex].evolution.length)
                                      this.evolve(this.inventory[pkmnIndex]);
                                  }
                                );
                    }
                    else if(this.inventory[pkmnIndex].evolution.length){
                      this.evolve(pkmnIndex);
                    }
                  }
                );
    }
  }

  evolve(pkmnIndex: any){
    let evo = this.inventory[pkmnIndex].evolution[0];
    if (this.inventory[pkmnIndex].lvl >= evo.lvl && evo.condition === '') {
      this.inventory[pkmnIndex].dex = evo.evolves_to;
      this._pkmn.evolvePokemon(this.inventory[pkmnIndex])
                .takeWhile(() => this.alive)
                .subscribe(
                  data => { },
                  error => console.log(error),
                  () => {
                    this._pkmn.getPokemonById(this.inventory[pkmnIndex]._id)
                              .takeWhile(() => this.alive)
                              .subscribe(
                                data => {
                                  this.inventory[pkmnIndex] = data;
                                  this._pkmn.getPokemonSprite(this.inventory[pkmnIndex]);
                                  console.log(this.inventory[pkmnIndex].sprite);
                                  this._pkmn.obsInventory.next(this.inventory);
                                }
                              );
                    this._pkmn.getEvolution(this.inventory[pkmnIndex])
                              .takeWhile(() => this.alive)
                              .subscribe(
                                data => {
                                  this.inventory[pkmnIndex].evolution = data;
                                }
                              );
                    this._dex.updateDex(this.inventory[pkmnIndex].dex)
                                        .takeWhile(() => this.alive)
                                        .subscribe(
                                          data => console.log('saved dex:', this.inventory[pkmnIndex].dex)
                                        );
                  }
                );
    }
  }

  saveEXP(pokemon: any) {
    this._pkmn.raisePokemon(pokemon)
              .takeWhile(() => this.alive)
              .subscribe(
                data => console.log('saved', data['lvl'], data['exp'], data['next_lvl']),
                error => console.log(error)
              );
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
