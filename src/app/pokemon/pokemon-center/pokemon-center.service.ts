import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const POKE_REST_URL = 'http://localhost:3000/';

@Injectable()
export class PokemonCenterService {

  private pokemonUrl = POKE_REST_URL + 'pokemon/';
  private lvlInfoUrl = POKE_REST_URL + 'level/';

  constructor(private http: Http) { }

  getPokemon() {
    return this.http.get(this.pokemonUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getLvlInfo(lvl: Number) {
    return this.http.get(this.lvlInfoUrl + lvl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  raisePokemon(pokemon: any) {
    return this.http.patch(this.pokemonUrl + pokemon._id, {exp: pokemon.exp, next_lvl: pokemon.next_lvl})
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
