import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const POKE_REST_URL = 'http://localhost:3000/pokedex/';
export const LOCAL_DEX = '/assets/shared/pokedex.json';
export const LOCAL_TRAINER = '/assets/shared/trainer.json';

@Injectable()
export class PokedexService {

  private apiUrl = POKE_REST_URL;

  constructor(private http: Http) { }

  getFullList(local?: boolean) {
    let url;
    if (local) {
      url = LOCAL_DEX;
    }
    else {
      url = this.apiUrl;
    }
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getTrainerDex(id: string, local?: boolean) {
    let url;
    if (local) {
      url = LOCAL_TRAINER;
    }
    else {
      url = this.apiUrl + id;
    }
    return this.http.get(url)
                    .map(this.extractTrainerDex)
                    .catch(this.handleError);
  }

  private extractTrainerDex(res: Response) {
    let body = res.json();
    return body.caught || [ ] ;
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
