import { Component, OnInit } from '@angular/core';

import { LOCAL_DEX, PokedexService } from './pokedex.service';

@Component({
  selector: 'pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  public fullList = [];
  public trainerCaught = [];

  constructor(
    private _pokedexService: PokedexService
  ) { }

  ngOnInit() {
    this.getFullDex();
    this.getTrainerDex();
  }

  private getFullDex() {
    this._pokedexService.getFullList(true)
                        .subscribe(
                          data => this.fullList = data,
                          error => console.log(error),
                          () => {
                            console.log(this.fullList);
                          }
                        );
  }

  private getTrainerDex() {
    this._pokedexService.getTrainerDex()
                        .subscribe(
                          data => this.trainerCaught = data,
                          error => console.log(error),
                          () => {
                            console.log(this.trainerCaught);
                          }
                        );
  }

  isCaught(pokemon: any) {
    return this.trainerCaught.includes(pokemon.dex);
  }
}
