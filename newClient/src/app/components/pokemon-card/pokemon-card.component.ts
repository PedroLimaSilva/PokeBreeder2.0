import { Component, OnInit, Input } from '@angular/core';

const SPRITES = [
  '/assets/img/sprites/pokemon/001/001.gif',
  '/assets/img/sprites/pokemon/001/001-2.gif',
  '/assets/img/sprites/pokemon/001/001-3.gif'
];

@Component({
  selector: 'poke-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  sprite: string;

  @Input() id: string;

  private current_sprite = 0;

  constructor() {}

  ngOnInit() {
    this.sprite = SPRITES[this.current_sprite];
  }

  changeSprite() {
    this.current_sprite++;
    if (this.current_sprite >= SPRITES.length) {
      this.current_sprite = 0;
    }
    this.sprite = SPRITES[this.current_sprite];
  }

}
