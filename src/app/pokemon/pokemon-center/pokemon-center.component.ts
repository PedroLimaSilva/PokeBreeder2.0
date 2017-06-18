import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'pokemon-center',
  templateUrl: './pokemon-center.component.html',
  styleUrls: ['./pokemon-center.component.scss']
})
export class PokemonCenterComponent implements OnInit {

  pokemon_list: FirebaseListObservable<any>;

  constructor(
    private _af: AngularFireDatabase
  ) {
    this.pokemon_list = this._af.list('/pokemon');
  }

  ngOnInit() {
  }

}
