import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpModule} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {
  }

  coindesk(): Observable<any> {
    const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    return this.http.get(url);
   }

  bitstamp(): Observable<any> {
    const url = 'https://www.bitstamp.net/api/ticker/';
    return this.http.get(url);
  }

  hitbtc(): Observable<any> {
    const url = 'https://api.hitbtc.com/api/2/public/ticker/btcusd';
    return this.http.get(url);
  }
}


