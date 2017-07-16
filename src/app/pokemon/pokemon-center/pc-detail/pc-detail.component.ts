import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { PokemonCenterService } from '../pokemon-center.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'pc-detail',
  templateUrl: './pc-detail.component.html',
  styleUrls: ['./pc-detail.component.scss']
})
export class PcDetailComponent implements OnInit, OnChanges {

  @Input() pokemon;
  expChanged: Subject<any> = new Subject<any>();

  constructor( private pc: PokemonCenterService ) { }

  ngOnInit() {
    this.expChanged
        .debounceTime(2000) // wait 2000ms after the last event before emitting last event
        .subscribe(exp => this.saveEXP());
  }

  ngOnChanges(changes) {
    console.log(changes);
    /*
    if (changes['pokemon'] && !changes['pokemon'].firstChange) {
      //this.getPokemonDetails();
    }
    */
  }

  pokemonString() {
    return JSON.stringify(this.pokemon);
  }

  raisePokemon(){
    this.pokemon.exp += 1;
    this.expChanged.next();
  }
  saveEXP(){
    this.pc.raisePokemon(this.pokemon)
           .subscribe(
             data => console.log('saved', data['exp']),
             error => console.log(error)
           );
  }

}
