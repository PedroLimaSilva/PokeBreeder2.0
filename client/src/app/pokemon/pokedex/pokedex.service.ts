import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const POKE_REST_URL = 'https://pokebreeder-rest.herokuapp.com/';
export const LOCAL_DEX = '/assets/shared/pokedex.json';
export const LOCAL_TRAINER = '/assets/shared/trainer.json';
export const TRAINER_ID = "5993710bc8c70bea45100347";

@Injectable()
export class PokedexService {

  private pokedexUrl = POKE_REST_URL + 'pokedex/';
  private trainerUrl = POKE_REST_URL + 'trainers/';
  private trainerID = '5993710bc8c70bea45100347';

  constructor(private http: Http) { }

  getFullList(local?: boolean) {
    let url;
    if (local) {
      url = LOCAL_DEX;
    }
    else {
      url = this.pokedexUrl;
    }
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getByDex(dex: string){
    return this.http.get(this.pokedexUrl+dex)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getTrainerDex() {
    let url = this.trainerUrl + this.trainerID + '/dex';
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  updateDex(dex: string) {
    let url = this.trainerUrl + this.trainerID + '/dex';
    return this.http.post(url, {dex: dex})
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
