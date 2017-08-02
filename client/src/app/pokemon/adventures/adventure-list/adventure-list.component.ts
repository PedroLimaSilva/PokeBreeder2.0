import { Component, OnInit, OnDestroy } from '@angular/core';

import { AdventureService } from '../adventure.service';

@Component({
  selector: 'adventure-list',
  templateUrl: './adventure-list.component.html',
  styleUrls: ['./adventure-list.component.scss']
})
export class AdventureListComponent implements OnInit, OnDestroy {

  private alive = true;

  adventure_list = [];

  constructor(
    private _adv: AdventureService
  ) { }

  ngOnInit() {
    this._adv.getAdventures()
              .takeWhile(() => this.alive)
              .subscribe(
                data => this.adventure_list = data,
                error => console.log(error),
                () => {}
              );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
