import { Directive, Inject, HostListener, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from '../utils/window.service';

@Directive({
  selector: '[pokeVerticalParalax]'
})
export class VerticalParalaxDirective implements OnInit {
  private layers;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) {}

  ngOnInit() {
    this.layers = this.document.getElementsByClassName('layer');
  }

  @HostListener('window:scroll')
  onScroll() {
    const offset =
      this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    for (let i = 0; i < this.layers.length; i++) {
      const layer = this.layers[i];
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
