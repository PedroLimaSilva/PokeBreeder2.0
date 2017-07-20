import { Injectable } from '@angular/core';

@Injectable()
export class ClickService {

  constructor() { }

  getExpPerClick(pokemon: any) {
    let lvl = 1;
    if (pokemon.lvl > 0) {
      lvl = pokemon.lvl;
    }
    let EVsum = 1;
    EVsum += pokemon['EVs']['SAT'];
    EVsum += pokemon['EVs']['SDE'];
    EVsum += pokemon['EVs']['SPD'];
    EVsum += pokemon['EVs']['DEF'];
    EVsum += pokemon['EVs']['ATK'];
    EVsum += pokemon['EVs']['HP'];
    let res = EVsum * lvl;
    return res;
  }

}
