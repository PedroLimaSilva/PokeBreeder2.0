import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { PokemonService } from '../../pokemon.service';
import { PokedexService } from '../../pokedex/pokedex.service';
import { ClickService } from '../../../services/click.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'pc-detail',
  templateUrl: './pc-detail.component.html',
  styleUrls: ['./pc-detail.component.scss']
})
export class PcDetailComponent implements OnInit, OnChanges, OnDestroy {

  private alive = true;
  private show = false;

  @Input() pokemon;
  @Output() onHide = new EventEmitter();
  @Output() onEvolution = new EventEmitter();

  leveling_up = false;

  evolution;

  editing_name = false;

  pickEgg = false;
  pickMate = false;

  constructor(
    private _pkmn: PokemonService,
    private pokedexService: PokedexService,
    private _click: ClickService
  ) { }

  ngOnInit() {
    setTimeout(
      () => this.show = true,
      50
    );
    this._pkmn.expChanged
        // .debounceTime(500) // wait 500ms after the last event before emitting last event
        .takeWhile(() => this.alive)
        .subscribe(
          pokemon => {
            this.pokemon = pokemon;
          }
        );
    this._pkmn.lvlUp
        .takeWhile(() => this.alive)
        .subscribe(
          pokemon => {
            this.pokemon = pokemon;
          }
        );
    this._pkmn.getEvolution(this.pokemon)
            .takeWhile(() => this.alive)
            .subscribe(
              data => {
                this.pokemon.evolution = data;
              }
            );
    this._pkmn.evolution
              .takeWhile(() => this.alive)
              .subscribe(
                data => this.pokemon = data
              );
  }

  ngOnChanges(changes) {
    if (changes['pokemon'] && !changes['pokemon'].firstChange) {
      this._pkmn.expChanged.next(changes['pokemon']['previousValue']);
      this._pkmn.getPokemonById(changes['pokemon']['currentValue']['_id'])
                .takeWhile(() => this.alive)
                .subscribe(
                  data => this.pokemon = data,
                  error => console.log(error)
                );
      this._pkmn.getEvolution(this.pokemon)
              .takeWhile(() => this.alive)
              .subscribe(
                data => {
                  this.pokemon.evolution = data;
                }
              );
    }
  }

  editName(isEditing: boolean) {
    if (this.pokemon.lvl > 0) {
      this.editing_name = isEditing;
      if (!isEditing) {
        this._pkmn.changeNickname(this.pokemon)
                .takeWhile(() => this.alive)
                .subscribe(
                  data => console.log('saved nickname', data.nickname),
                  error => console.log(error),
                  () => {}
                );
      }
    }
    else {
      this.editing_name = false;
    }
  }

  hide() {
    this.show = false;
    setTimeout(
      () => this.onHide.emit(),
      300
    );
  }

  pokemonString() {
    return JSON.stringify(this.pokemon);
  }

  raisePokemon() {
    if (!this.pokemon.leveling_up && this.pokemon.lvl < 100) {
      let exp_gain = this._click.getExpPerClick(this.pokemon);
      this.pokemon.exp += exp_gain;
      this.pokemon.next_lvl -= exp_gain;
      if (this.pokemon.next_lvl <= 0 && !this.pokemon.leveling_up) {
        this.pokemon.leveling_up = true;
        this._pkmn.lvlUp.next(this.pokemon);
      }
      else {
        this._pkmn.expChanged.next(this.pokemon);
      }
    }
  }

  showPickEgg(){
    if(this.pickMate){
      this.dismissPicker();
      setTimeout(
        ()=>{
          this.pickEgg = true;
        },
        300
      );
    }
    else
      this.pickEgg = true;
  }
  showPickMate(){
    if(this.pickEgg){
      this.dismissPicker();
      setTimeout(
        ()=>{
          this.pickMate = true;
        },
        300
      );
    }
    else
      this.pickMate = true;
  }

  dismissPicker(){
    setTimeout(
      ()=>{
        this.pickMate = false;
        this.pickEgg = false;
      },
      300
    );
  }
  selectMate(pokemon){
    if(this.pokemon.mate){
      this._pkmn.removeMate(this.pokemon.mate)
              .takeWhile(() => this.alive)
              .subscribe(
                data => {},
                error => console.log(error)
              );
    }
    this._pkmn.assignMate(this.pokemon, pokemon)
              .takeWhile(() => this.alive)
              .subscribe(
                data => this.pokemon.mate = pokemon,
                error => console.log(error)
              );
    this._pkmn.assignMate(pokemon, this.pokemon)
              .takeWhile(() => this.alive)
              .subscribe(
                data => {},
                error => console.log(error)
              );
    this.dismissPicker();
  }
  removeMate(){
    if(this.pokemon.mate){
      this._pkmn.removeMate(this.pokemon.mate)
                .takeWhile(() => this.alive)
                .subscribe(
                  pokemon => {
                    this._pkmn.updatePkmn(pokemon);
                  },
                  error => console.log(error),
                  () => {
                    this._pkmn.removeMate(this.pokemon)
                              .takeWhile(()=>this.alive)
                              .subscribe(
                                data=>{this.pokemon.mate = null},
                                error => console.log(error),
                                ()=>{}
                              );
                  }
                );

    }
  }

  selectOponent(pokemon){
    console.log('oponent', pokemon);
    this.dismissPicker();
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
