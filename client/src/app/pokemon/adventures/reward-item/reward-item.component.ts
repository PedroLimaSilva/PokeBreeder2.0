import { Component, Input, OnInit } from '@angular/core';
import { PokedexService } from '../../pokedex/pokedex.service';

@Component({
  selector: 'reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./reward-item.component.scss']
})
export class RewardItemComponent implements OnInit {

  @Input() reward;
  @Input() type: string;
  @Input() caught = false;

  constructor(
    private _pokedex: PokedexService
  ) { }

  ngOnInit() {
    if(this.type === 'pokemon'){
      this._pokedex.getByDex(this.reward.dex)
                   .subscribe(
                     data => this.reward.dex = data,
                     error => console.log(error)
                   );
    }
  }

}
