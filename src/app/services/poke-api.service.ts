import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const POKE_API_URL = 'http://pokeapi.co/api/v2/';

@Injectable()
export class PokeAPIService {

  private apiUrl = POKE_API_URL;

  constructor(private http: Http) { }

  get_Pokemon(dex: number): Observable<any> {
    let url = this.apiUrl + 'pokemon/' + dex;
    return this.http.get(url)
                    .map(this.addDex)
                    .catch(this.handleError);
  }

  getUrl(endpoint: string, args?: Array<string>) {
    let url = '';
    switch (endpoint) {
      case 'get_Pokemon':
        url = this.apiUrl + 'pokemon/' + args[0];
        break;
      case 'getPokedex':
        url = this.apiUrl + 'pokemon/?limit=' + args[0] + '&offset=0';
        break;
      case 'getExtension':
        url = args[0];
        break;
      default:
        break;
    };
    return url;
  }

  private getDexEntries(cachedDex) {
    for (let i = 0; i < cachedDex.length; i++) {
      if (!cachedDex[i].dex) {
        this.get_Pokemon(cachedDex[i].name)
            .subscribe(
              data => {
                cachedDex[i].id = data.id;
                cachedDex[i]['sprites'] = {};
                cachedDex[i]['sprites']['front_default'] = data.sprites.front_default;
                localStorage.setItem('POKEDEX', JSON.stringify(cachedDex));
              },
              error => console.log(error),
              () => {}
            );
      }
    }
  }

  getPokedex(limit: number) {
    let cachedDex = JSON.parse(localStorage.getItem('POKEDEX'));
    if (cachedDex) {
      this.getDexEntries(cachedDex);
    }
    else {
      let url = this.apiUrl + 'pokemon/?limit=' + limit + '&offset=0';
      return this.http.get(url)
                      .map(this.extractData)
                      .catch(this.handleError)
                      .subscribe(
                        data => {
                          cachedDex = data.results;
                          localStorage.setItem('POKEDEX', JSON.stringify(cachedDex));
                          this.getDexEntries(cachedDex);
                        }
                      );

    }
  }
  getExtension(url: string): Observable<any> {
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  private addDex(res: Response) {
    let body = res.json();
    body['dex'] = body.id;
    return body || [ ] ;
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
