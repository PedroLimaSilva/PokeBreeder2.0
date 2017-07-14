import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pokedex-entry',
  templateUrl: './pokedex-entry.component.html',
  styleUrls: ['./pokedex-entry.component.scss']
})
export class PokedexEntryComponent implements OnInit {

  @Input() pokemon;
  @Input() caught;

  constructor() { }

  ngOnInit() {
    this.pokemon['sprite'] = 'assets/img/sprites/pokemon/' + this.pokemon.dex + '/' + this.pokemon.dex + '.gif';
  }

}
