import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exp-bar',
  templateUrl: './exp-bar.component.html',
  styleUrls: ['./exp-bar.component.scss']
})
export class ExpBarComponent implements OnInit {

  @Input() pokemon;
  @Input() initial;
  @Input() max;

  constructor() { }

  ngOnInit() {
  }

}
