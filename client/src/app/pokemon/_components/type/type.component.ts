import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
