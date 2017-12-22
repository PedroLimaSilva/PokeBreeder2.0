import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'poke-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  animations: [
    trigger('menu', [
      state(
        'closed',
        style({
          opacity: '0',
          display: 'none'
        })
      ),
      state(
        'open',
        style({
          opacity: '1',
          display: 'block'
        })
      ),
      transition('closed => open', animate('300ms ease-out')),
      transition('open => closed', animate('300ms ease-in'))
    ]),
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
    trigger('twist', [
      state(
        'closed',
        style({
          opacity: '1',
          transform: 'rotate(0deg)'
        })
      ),
      state(
        'open',
        style({
          opacity: '0',
          transform: 'rotate(180deg)'
        })
      ),
      transition('start <=> finish', animate('300ms ease-in-out'))
    ])
  ]
})
export class MenuButtonComponent implements OnInit {
  open = 'closed';
  pulse = 'start';
  twist = 'start';

  constructor() {}

  ngOnInit() {}

  toggleOpen() {
    if (this.open === 'closed') {
      this.open = 'open';
    } else {
      this.open = 'closed';
    }
  }

  onMenuClick() {
    this.toggleOpen();
    this.animatePulse();
  }

  animatePulse() {
    this.pulse = 'finish';
    this.twist = 'finish';
    setTimeout(() => {
      this.pulse = 'start';
    } , 500);
  }
}
