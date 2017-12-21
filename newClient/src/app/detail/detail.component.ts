import { Component, HostListener, Inject, OnInit } from '@angular/core';

const SPRITES = [
  '/assets/img/sprites/pokemon/001/001.gif',
  '/assets/img/sprites/pokemon/001/001-2.gif',
  '/assets/img/sprites/pokemon/001/001-3.gif'
];

@Component({
  selector: 'poke-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  sprite: string;

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
