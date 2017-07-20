import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const POKE_REST_URL = 'http://localhost:3000/';

@Injectable()
export class PokemonCenterService {

  private pokemonUrl = POKE_REST_URL + 'pokemon/';
  private lvlInfoUrl = POKE_REST_URL + 'level/';
  private evolutionUrl = POKE_REST_URL + 'evolution/';


  // this subject waits for the user to stop clicking before emitting
  public expChanged: Subject<any> = new Subject<any>();

  // this subject emits a level up event as soon as the pokemon reaches another level
  public lvlUp: Subject<any> = new Subject<any>();

  constructor(private http: Http) { }

  getPokemonSprite(pokemon) {
    pokemon['sprite'] = 'assets/img/sprites/pokemon/' + pokemon.dex_entry.dex + '/' + pokemon.dex_entry.dex + '.gif';
    pokemon['egg_sprite'] = 'assets/img/sprites/egg.gif';
  }

  getPokemon() {
    return this.http.get(this.pokemonUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getPokemonById(id: string) {
    return this.http.get(this.pokemonUrl + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getLvlInfo(lvl: Number) {
    return this.http.get(this.lvlInfoUrl + lvl)
                    .map(this.extractData)
                    .catch(this.handleError);
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

}
