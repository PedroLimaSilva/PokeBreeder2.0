import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from '../utils/window.service';

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
  private card_layers;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) {}

  ngOnInit() {
    this.sprite = SPRITES[this.current_sprite];
    this.card_layers = this.document.getElementsByClassName('layer');
    console.log(this.card_layers);
  }

  changeSprite() {
    this.current_sprite++;
    if (this.current_sprite >= SPRITES.length) {
      this.current_sprite = 0;
    }
    this.sprite = SPRITES[this.current_sprite];
  }

  @HostListener('window:scroll')
  onScroll() {
    const offset =
      this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    for (let i = 0; i < this.card_layers.length; i++) {
      const layer = this.card_layers[i];
      const depth = layer.getAttribute('data-depth');
      const movement = -(offset * depth);
      const translate3d = 'translate3d(0, ' + movement + 'px, 0)';
      let scaleFactor = (1 - offset / this.window.outerHeight) * depth;
      if (scaleFactor < 0) {
        scaleFactor = 0;
      }
      const scale = 'scale(' + scaleFactor + ')';
      if (depth === '1') {
        layer.style.transform = translate3d + ' ' + scale;
      } else {
        layer.style.transform = translate3d;
      }
    }
  }
}
