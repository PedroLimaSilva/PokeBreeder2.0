import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const POKE_REST_URL = 'http://localhost:3000/';
const localAdventures_url = '/assets/shared/adventures.json';

@Injectable()
export class AdventureService {

  adventuresUrl = POKE_REST_URL + 'adventures/';

  constructor(
    private http: Http
  ) {

  }

  getAdventures(){
    return this.http.get(this.adventuresUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getAdventureById(id: string) {
    return this.http.get(this.adventuresUrl + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || [];
  }

  private handleError(error: Response | any) {
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
