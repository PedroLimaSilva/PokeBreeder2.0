import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, ActivatedRoute, ParamMap } from '@angular/router';
import { AdventureService } from '../adventure.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'adventure-detail',
  templateUrl: './adventure-detail.component.html',
  styleUrls: ['./adventure-detail.component.scss']
})
export class AdventureDetailComponent implements OnInit, OnDestroy {

  private alive = true;

  adventure: any = {};

  constructor(
    private route: ActivatedRoute,
    private _adv: AdventureService
  ) {
    this.adventure.rewards = {}
  }

  ngOnInit() {
    this.route.paramMap
              .switchMap((params: ParamMap) =>
                this._adv.getAdventureById(params.get('id'))
              )
              .takeWhile(() => this.alive)
              .subscribe(
                data => {
                  this.adventure = data;
                },
                error => console.log(error)
              );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
