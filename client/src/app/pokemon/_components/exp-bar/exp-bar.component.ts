import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';

import { PokemonService } from '../../pokemon.service';
import { PokedexService } from '../../pokedex/pokedex.service';
import { ClickService } from '../../../services/click.service';

@Component({
  selector: 'exp-bar',
  templateUrl: './exp-bar.component.html',
  styleUrls: ['./exp-bar.component.scss']
})
export class ExpBarComponent implements OnInit, OnChanges, OnDestroy {

  @Input() pokemon;

  private alive = true;
  startExp = 0;
  requiredExp = 100;

  constructor(
    private _pkmn: PokemonService,
    private pokedexService: PokedexService,
    private _click: ClickService
  ) { }

  ngOnInit() {
    this._pkmn.lvlUp
        .takeWhile(() => this.alive)
        .subscribe(
          pokemon => {
            if(pokemon.lvl < 100){
              this._pkmn.getLvlInfo(pokemon.lvl)
                .takeWhile(() => this.alive)
                .subscribe(
                  data => {
                    let lvlInfo = data;
                    this.startExp = lvlInfo.total[this.pokemon.dex_entry.exp_group];
                    this.requiredExp = lvlInfo.next_lvl[this.pokemon.dex_entry.exp_group];
                  }
                );
            }
          }
        );
    if (this.pokemon.lvl > 0) {
      this._pkmn.getLvlInfo(this.pokemon.lvl)
                .takeWhile(() => this.alive)
                .subscribe(
                  data => {
                    let lvlInfo = data;
                    this.startExp = lvlInfo.total[this.pokemon.dex_entry.exp_group];
                    if(this.pokemon.lvl < 100)
                      this.requiredExp = lvlInfo.next_lvl[this.pokemon.dex_entry.exp_group];
                    else{
                      this.requiredExp = 0;
                    }
                  }
                );
    }
    else {
      this.startExp = 0;
      this.requiredExp = this.pokemon.dex_entry.egg_steps;
    }
  }

  ngOnChanges() {
    if (this.pokemon.lvl > 0) {
      this._pkmn.getLvlInfo(this.pokemon.lvl)
              .takeWhile(() => this.alive)
              .subscribe(
                data => {
                  let lvlInfo = data;
                  this.startExp = lvlInfo.total[this.pokemon.dex_entry.exp_group];
                  if(this.pokemon.lvl < 100)
                    this.requiredExp = lvlInfo.next_lvl[this.pokemon.dex_entry.exp_group];
                  else{
                    this.requiredExp = 0;
                  }
                }
              );
    }
    else {
      this.startExp = 0;
      this.requiredExp = this.pokemon.dex_entry.egg_steps;
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
