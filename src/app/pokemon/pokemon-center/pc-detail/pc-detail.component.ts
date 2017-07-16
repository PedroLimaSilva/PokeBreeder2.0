import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'pc-detail',
  templateUrl: './pc-detail.component.html',
  styleUrls: ['./pc-detail.component.scss']
})
export class PcDetailComponent implements OnInit, OnChanges {

  @Input() pokemon;

  constructor() { }

  ngOnInit() {
    this.getLevel()
  }

  ngOnChanges(changes) {
    console.log(changes);
    /*
    if (changes['pokemon'] && !changes['pokemon'].firstChange) {
      //this.getPokemonDetails();
    }
    */
    this.getLevel();
  }

  getLevel() {

  }

  pokemonString() {
    return JSON.stringify(this.pokemon);
  }

}
