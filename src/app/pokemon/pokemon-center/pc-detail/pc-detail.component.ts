import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { PokemonCenterService } from '../pokemon-center.service';
import { ClickService } from '../../../services/click.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'pc-detail',
  templateUrl: './pc-detail.component.html',
  styleUrls: ['./pc-detail.component.scss']
})
export class PcDetailComponent implements OnInit, OnChanges {

  @Input() pokemon;
  @Output() onHide = new EventEmitter();

  // this subject waits for the user to stop clicking before emitting
  expChanged: Subject<any> = new Subject<any>();

  // this subject emits a level up event as soon as the pokemon reaches another level
  lvlUp: Subject<any> = new Subject<any>();

  leveling_up = false;

  constructor(
    private pc: PokemonCenterService,
    private _click: ClickService
  ) { }

  ngOnInit() {
    this.expChanged
        .debounceTime(500) // wait 500ms after the last event before emitting last event
        .subscribe(
          pokemon => {
            this.saveEXP(pokemon);
          }
        );
    this.lvlUp
        .subscribe(
          pokemon => {
            this.levelUp(pokemon);
          }
        );
  }

  ngOnChanges(changes) {
    console.log(changes);
    if (changes['pokemon'] && !changes['pokemon'].firstChange) {
      this.expChanged.next(changes['pokemon']['previousValue']);
    }
  }

  hide() {
    this.onHide.emit();
  }

  pokemonString() {
    return JSON.stringify(this.pokemon);
  }

  raisePokemon() {
    if (!this.leveling_up) {
      let exp_gain = this._click.getExpPerClick(this.pokemon);
      this.pokemon.exp += exp_gain;
      this.pokemon.next_lvl -= exp_gain;
      if (this.pokemon.next_lvl <= 0 && !this.leveling_up) {
        this.leveling_up = true;
        this.lvlUp.next();
      }
      else {
        this.expChanged.next(this.pokemon);
      }
    }
  }

  levelUp(pokemon?: any) {
    let changedPokemon;
    if (!pokemon) {
      changedPokemon = this.pokemon;
    }
    else {
      changedPokemon = pokemon;
    }
    this.pokemon.lvl++;
    let lvlInfo;
    this.pc.getLvlInfo(this.pokemon.lvl)
            .subscribe(
              data => lvlInfo = data[0],
              error => console.log(error),
              () => {
                console.log(lvlInfo.next_lvl);
                console.log(this.pokemon);
                this.pokemon.next_lvl = lvlInfo.next_lvl[this.pokemon.dex_entry.exp_group];
                this.pokemon.exp = lvlInfo.total[this.pokemon.dex_entry.exp_group];
                this.saveEXP(pokemon);
                this.leveling_up = false;
              }
            );
    ;
  }
  saveEXP(pokemon?: any) {
    let changedPokemon;
    if (!pokemon) {
      changedPokemon = this.pokemon;
    }
    else {
      changedPokemon = pokemon;
    }
    this.pc.raisePokemon(changedPokemon)
           .subscribe(
             data => console.log('saved', data['lvl'], data['exp'], data['next_lvl']),
             error => console.log(error)
           );
  }

}
