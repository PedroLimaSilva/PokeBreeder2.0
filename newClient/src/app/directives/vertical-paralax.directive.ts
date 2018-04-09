import { Directive, Inject, HostListener, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from '../utils/window.service';

@Directive({
  selector: '[pokeVerticalParalax]'
})
export class VerticalParalaxDirective implements OnInit {
  private layers;
  private docOffset;
  private elem;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private renderer: Renderer2,
    private _elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.elem = this._elementRef.nativeElement;
    this.layers = this.elem.getElementsByClassName('layer');
    this.docOffset = this.elem.offsetTop;
  }

  @HostListener('window:scroll')
  onScroll() {
    this.parallax();
    this.listCollapse();
  }

  private parallax() {
    let offset =
      this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    this.docOffset = this.elem.offsetTop;
    if (offset >= this.docOffset) {
      offset = offset - this.docOffset;
      for (let i = 0; i < this.layers.length; i++) {
        const layer = this.layers[i];
        const depth = layer.getAttribute('data-depth');
        const movement = -(offset * depth);
        const translate3d = `translate3d(0, ${Math.floor(movement)}px, 0)`;
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
    } else {
      // For offset === this.docOffset no transform
      for (let i = 0; i < this.layers.length; i++) {
        const layer = this.layers[i];
        const translate3d = `translate3d(0,0,0)`;
        const scale = 'scale(1)';
        layer.style.transform = translate3d + ' ' + scale;
      }
    }
    /* Else if offset < this.docOffset no transform
     * Create new squew and translate transforms form front list
     */
  }

  private listCollapse() {
    let marginBottom = -((this.elem.offsetHeight / 2) - this.docOffset);
    console.log(marginBottom);
    if (marginBottom > 0) {
      marginBottom = 0;
    }
    this.renderer.setStyle(this.elem, 'margin-bottom', marginBottom + 'px');
  }
}
