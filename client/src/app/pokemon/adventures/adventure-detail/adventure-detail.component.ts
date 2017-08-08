import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, ActivatedRoute, ParamMap } from '@angular/router';
import { AdventureService } from '../adventure.service';
import { PokedexService } from '../../pokedex/pokedex.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'adventure-detail',
  templateUrl: './adventure-detail.component.html',
  styleUrls: ['./adventure-detail.component.scss']
})
export class AdventureDetailComponent implements OnInit, OnDestroy {

  private alive = true;

  adventure: any = {};
  caught: Array<String> = [];
  caught_map: {};

  constructor(
    private route: ActivatedRoute,
    private _adv: AdventureService,
    private _pkdx: PokedexService
  ) {
    this.adventure.rewards = {};
  }

  ngOnInit() {
    this._pkdx.getTrainerDex()
              .takeWhile( () => this.alive )
              .subscribe(
                data => {
                  this.caught = data;
                },
                error => console.log(error),
                () => {
                  this.getAdventure();
                }
              );
  }

  getAdventure(){
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this._adv.getAdventureById(params.get('id'))
      )
      .takeWhile(() => this.alive)
      .subscribe(
        data => {
          this.adventure = data;
          if (this.adventure.assignedTo) {
            this._pkdx.getByDex(this.adventure.assignedTo.dex)
                      .subscribe(
                        entry => this.adventure.assignedTo.dex_entry = entry,
                        error => console.log(error)
                      );
          }
          this.caught_map = {};
          this.adventure.rewards.eggs.forEach(element => {
            this.caught_map[element.dex] = this.isCaught(element.dex);
          });
        },
        error => console.log(error)
      );
  }

  isCaught(dex): boolean {
    if (this.caught_map[dex] || this.caught.includes(dex))
      return true;
    return false;
  }

  isComplete(){
    return ((new Date(Date.now()).getTime()) > (new Date(this.adventure.completedOn).getTime()));
  }

  claimRewards(){
    this._adv.claimRewards(this.adventure)
             .subscribe(
               data => {},
               error => console.log(error),
               () => {
                 this.getAdventure();
               }
             );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
