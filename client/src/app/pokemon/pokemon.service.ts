import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const POKE_REST_URL = 'http://localhost:3000/';

export class Request {
  // GET, PATCH, POST, PUT
  command: String;
  url: String;
  body: String;
  sent: boolean;
  succeeded: boolean;

  constructor(command, url, body){
    this.command = command;
    this.url = url;
    this.body = body;
    this.sent = false;
    this.succeeded = false;
  }
}

@Injectable()
export class PokemonService implements OnInit, OnDestroy {

  private alive = true;

  private pokemonUrl = POKE_REST_URL + 'pokemon/';
  private lvlInfoUrl = POKE_REST_URL + 'level/';
  private evolutionUrl = POKE_REST_URL + 'evolution/';

  // this subject emits a change event as soon any pokemon in the inventory is changed
  public obsInventory: Subject<any> = new Subject<any>();
  public inventory = [];

  // this subject waits for the user to stop clicking before emitting
  public expChanged: Subject<any> = new Subject<any>();

  // this subject emits a level up event as soon as the pokemon reaches another level
  public lvlUp: Subject<any> = new Subject<any>();

  // this subject emits an evolution event as soon as the pokemon reaches another stage
  public evolution: Subject<any> = new Subject<any>();

  constructor(private http: Http) { }

  ngOnInit(){
    this.getPokemon()
        .takeWhile(()=>this.alive)
        .subscribe(
          data => this.inventory = data,
          error => console.log(error),
          () => this.obsInventory.next(this.inventory)
        );
  }

  getPokemonSprite(pokemon) {
    pokemon['sprite'] = 'assets/img/sprites/pokemon/' + pokemon.dex + '/' + pokemon.dex + '.gif';
    pokemon['egg_sprite'] = 'assets/img/sprites/egg.gif';
  }

  getPokemon() {
    return this.http.get(this.pokemonUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  findPkmnIndex(pokemon){
    let inventoryClone = JSON.parse(JSON.stringify(this.inventory));
    let index = inventoryClone.map( (element) => { return element._id; }).indexOf(pokemon._id);
    return index;
  }

  updatePkmn(pokemon){
    let index = this.findPkmnIndex(pokemon);
    this.getPokemonById(pokemon._id)
        .subscribe(
          data => {
            console.log(data);
            this.inventory[index] = data;
          },
          error => console.log(error),
          () => {
            this.obsInventory.next(this.inventory);
          }
        );
  }

  getAvailablePkmn(pokemon: any){
    return this.inventory.filter(
      e => {
        return e._id != pokemon._id &&
               e.exp >= 0 &&
          (!e.busyUntil || new Date(e.busyUntil).getTime() < new Date(Date.now()).getTime()) &&
               !e.mate &&
               !e.egg;
      }
    );
  }

  getAvailableEggs(pokemon: any){
    return this.inventory.filter(
      e => {
        return e._id != pokemon._id && !e.mate && e.exp < 0;
      }
    );
  }

  getPokemonById(id: string) {
    return this.http.get(this.pokemonUrl + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getLvlInfo(lvl: number, local=true) {
    if(local){
      return this.http.get('assets/shared/level-table.json')
                      .map( res => {
                        let body = res.json();
                        return body[lvl-1] || {} ;
                      })
                      .catch(this.handleError);
    }
    else {
      return this.http.get(this.lvlInfoUrl + lvl)
                      .map(this.extractData)
                      .catch(this.handleError);
    }
  }

  getEvolution(pokemon: any) {
    return this.http.get(this.evolutionUrl + pokemon.dex_entry.dex)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  raisePokemon(pokemon: any) {
    return this.http.patch(this.pokemonUrl + pokemon._id, {lvl: pokemon.lvl, exp: pokemon.exp, next_lvl: pokemon.next_lvl})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  evolvePokemon(pokemon: any) {
    return this.http.patch(this.pokemonUrl + pokemon._id, {dex: pokemon.dex})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  changeNickname(pokemon: any) {
    return this.http.patch(this.pokemonUrl + pokemon._id, {nickname: pokemon.nickname})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  assignMate(pokemon, assignee){
    return this.http.patch(this.pokemonUrl + pokemon._id, {mate: assignee._id})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  removeMate(pokemon){
    return this.http.patch(this.pokemonUrl + pokemon._id, {mate: 'remove'})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private avgIVs(pokemon){
    let sumIVs = pokemon.IVs.SPD +
                 pokemon.IVs.ATK +
                 pokemon.IVs.DEF +
                 pokemon.IVs.SDE +
                 pokemon.IVs.SAT +
                 pokemon.IVs.HP;
    let res = sumIVs/6;
    if(res === 0)
      res = 1;
    return res;
  }
  private avgEVs(pokemon){
    let sumEVs = pokemon.EVs.SPD +
                 pokemon.EVs.ATK +
                 pokemon.EVs.DEF +
                 pokemon.EVs.SDE +
                 pokemon.EVs.SAT +
                 pokemon.EVs.HP;
    let res = sumEVs/6;
    if(res === 0)
      res = 1;
    return res;
  }

  expGainMate(mate){
    let res = mate.lvl * Math.ceil((this.avgEVs(mate))/2) * Math.ceil((this.avgIVs(mate))/2);
    return res;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || [ ] ;
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  ngOnDestroy(){
    this.alive = false;
  }
}
