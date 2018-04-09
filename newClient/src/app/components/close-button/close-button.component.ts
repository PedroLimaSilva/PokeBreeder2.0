import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'poke-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss'],
  animations: [
    trigger('pulse', [
      state(
        'start',
        style({
          display: 'none',
          opacity: '1',
          transform: 'scale(1)'
        })
      ),
      state(
        'finish',
        style({
          display: 'block',
          opacity: '0',
          transform: 'scale(10)'
        })
      ),
      transition('start => finish', animate('300ms ease-in-out'))
    ]),
  ]
})
export class CloseButtonComponent implements OnInit {

  pulse = 'start';

  constructor() { }

  ngOnInit() {
  }

  onMenuClick() {
    // this.toggleOpen();
    this.animatePulse();
  }

  animatePulse() {
    this.pulse = 'finish';
    setTimeout(() => {
      this.pulse = 'start';
    }, 500);
  }

}
