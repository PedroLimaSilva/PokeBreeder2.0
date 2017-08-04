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
  caught_map: Array<boolean> = [];

  complete = false;

  constructor(
    private route: ActivatedRoute,
    private _adv: AdventureService,
    private _pkdx: PokedexService
  ) {
    this.adventure.rewards = {}
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
          this.complete = this.isComplete();
          this.caught_map = [];
          this.adventure.rewards.eggs.forEach(element => {
            this.caught_map.push(this.isCaught(element))
          });
        },
        error => console.log(error)
      );
  }

  isCaught(pokemon): boolean {
    if(this.caught.includes(pokemon.dex))
      return true;
    return false;
  }

  isComplete(){
    return ((new Date(Date.now()).getTime()) > (new Date(this.adventure.completedOn).getTime()));
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
