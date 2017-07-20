import { Component, OnInit } from '@angular/core';

import { PokeAPIService } from './services/poke-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _pokeAPI: PokeAPIService
  ) {
  }

  ngOnInit() {
    this._pokeAPI.getPokedex(151);
  }
}
