import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'poke-timeline-event',
  templateUrl: './timeline-event.component.html',
  styleUrls: ['./timeline-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineEventComponent implements OnInit {

  date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
