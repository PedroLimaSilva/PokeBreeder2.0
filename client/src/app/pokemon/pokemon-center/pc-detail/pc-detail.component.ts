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
    this._pkmn.expChanged
        .debounceTime(500) // wait 500ms after the last event before emitting last event
        .takeWhile(() => this.alive)
        .subscribe(
          pokemon => {
            this.saveEXP(pokemon);
          }
        );
    this._pkmn.lvlUp
        .takeWhile(() => this.alive)
        .subscribe(
          pokemon => {
            this.levelUp(pokemon);
          }
        );
    this._pkmn.getEvolution(this.pokemon)
            .takeWhile(() => this.alive)
            .subscribe(
              data => {
                this.evolution = data;
                console.log(this.evolution);
              }
            );
  }

  ngOnChanges(changes) {
    if (changes['pokemon'] && !changes['pokemon'].firstChange) {
      this._pkmn.expChanged.next(changes['pokemon']['previousValue']);
      this._pkmn.getEvolution(this.pokemon)
              .takeWhile(() => this.alive)
              .subscribe(
                data => {
                  this.evolution = data;
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
    this.onHide.emit();
  }

  pokemonString() {
    return JSON.stringify(this.pokemon);
  }

  raisePokemon() {
    if (!this.leveling_up && this.pokemon.lvl < 100) {
      let exp_gain = this._click.getExpPerClick(this.pokemon);
      this.pokemon.exp += exp_gain;
      this.pokemon.next_lvl -= exp_gain;
      if (this.pokemon.next_lvl <= 0 && !this.leveling_up) {
        this.leveling_up = true;
        this._pkmn.lvlUp.next(this.pokemon);
      }
      else {
        this._pkmn.expChanged.next(this.pokemon);
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
    if (this.pokemon.lvl === 1) {
      this.pokedexService.updateDex(this.pokemon.dex)
                          .takeWhile(() => this.alive)
                          .subscribe(
                            data => console.log('saved dex:', this.pokemon.dex)
                          );
    }
    this._pkmn.getLvlInfo(this.pokemon.lvl)
            .takeWhile(() => this.alive)
            .subscribe(
              data => lvlInfo = data[0],
              error => console.log(error),
              () => {
                this.pokemon.next_lvl = lvlInfo.next_lvl[this.pokemon.dex_entry.exp_group];
                this.pokemon.exp = lvlInfo.total[this.pokemon.dex_entry.exp_group];
                this.saveEXP(pokemon);
                this.leveling_up = false;
                this.evolve();
              }
            );
  }

  evolve() {
    if (this.evolution && this.evolution.length) {
      let evo = this.evolution[0];
      if (this.pokemon.lvl >= evo.lvl && evo.condition === '') {
        this.pokemon.dex = evo.evolves_to;
        this._pkmn.evolvePokemon(this.pokemon)
                  .takeWhile(() => this.alive)
                  .subscribe(
                    data => { },
                    error => console.log(error),
                    () => {
                      this.onEvolution.emit();
                      this._pkmn.getPokemonById(this.pokemon._id)
                                .takeWhile(() => this.alive)
                                .subscribe(
                                  data => {
                                    this.pokemon = data;
                                    this._pkmn.getPokemonSprite(this.pokemon);
                                  }
                                );
                      this._pkmn.getEvolution(this.pokemon)
                                .takeWhile(() => this.alive)
                                .subscribe(
                                  data => {
                                    this.evolution = data;
                                  }
                                );
                      this.pokedexService.updateDex(this.pokemon.dex)
                                          .takeWhile(() => this.alive)
                                          .subscribe(
                                            data => console.log('saved dex:', this.pokemon.dex)
                                          );
                    }
                  );
      }
    }
  }
  saveEXP(pokemon?: any) {
    let changedPokemon;
    if (!pokemon) {
      changedPokemon = this.pokemon;
    }
    else {
      changedPokemon = pokemon;
    }
    this._pkmn.raisePokemon(changedPokemon)
              .takeWhile(() => this.alive)
              .subscribe(
                data => console.log('saved', data['lvl'], data['exp'], data['next_lvl']),
                error => console.log(error)
              );
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
                  data => {},
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
