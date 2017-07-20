import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';

import { PokemonCenterService } from '../../pokemon-center/pokemon-center.service';
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
  startExp;
  requiredExp;

  constructor(
    private pc: PokemonCenterService,
    private pokedexService: PokedexService,
    private _click: ClickService
  ) { }

  ngOnInit() {
    this.pc.lvlUp
        .takeWhile(() => this.alive)
        .subscribe(
          pokemon => {
            this.pc.getLvlInfo(pokemon.lvl)
              .takeWhile(() => this.alive)
              .subscribe(
                data => {
                  let lvlInfo = data[0];
                  this.startExp = lvlInfo.total[this.pokemon.dex_entry.exp_group];
                  this.requiredExp = lvlInfo.next_lvl[this.pokemon.dex_entry.exp_group];
                }
              );
          }
        );
    if (this.pokemon.lvl > 0) {
      this.pc.getLvlInfo(this.pokemon.lvl)
              .takeWhile(() => this.alive)
              .subscribe(
                data => {
                  let lvlInfo = data[0];
                  this.startExp = lvlInfo.total[this.pokemon.dex_entry.exp_group];
                  this.requiredExp = lvlInfo.next_lvl[this.pokemon.dex_entry.exp_group];
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
      this.pc.getLvlInfo(this.pokemon.lvl)
              .takeWhile(() => this.alive)
              .subscribe(
                data => {
                  let lvlInfo = data[0];
                  this.startExp = lvlInfo.total[this.pokemon.dex_entry.exp_group];
                  this.requiredExp = lvlInfo.next_lvl[this.pokemon.dex_entry.exp_group];
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
