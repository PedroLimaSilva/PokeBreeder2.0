import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PokemonService {

  // this subject emits a change event as soon any pokemon in the inventory is changed
  public obsInventory: Subject<any> = new Subject<any>();

  constructor() { }

}
