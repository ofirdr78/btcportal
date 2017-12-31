import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpModule} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';


@Injectable()
export class AppService {
  newData: any;


  constructor(private http: Http) {
    this.newData = {};

  }

  async coindesk(): Promise<any> {
    const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    return this.http.get(url).toPromise();

  }
  async bitstamp(): Promise<any> {
    const url = 'https://www.bitstamp.net/api/ticker/';
    return this.http.get(url).toPromise();
  }

  async hitbtc(): Promise<any> {
    const url = 'https://api.hitbtc.com/api/2/public/ticker/btcusd';
    return this.http.get(url).toPromise();
  }
}


