import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  coindeskRate: string;
  bitstampRate: string;
  hitbtcRate: string;
  now: Date;
  currentTime: any;
  fullText: string;
  fullText2: string;
  partialText: string;
  partialText2: string;
  pos: number;
  pos2: number;
  private tick: string;
  private subscription: Subscription;
  private subscription2: Subscription;
  constructor(private appService: AppService) {
    this.coindeskRate = '';
    this.bitstampRate = '';
    this.hitbtcRate = '';
    this.pos = 0;
    this.pos2 = 0;
    this.partialText = '';
    this.partialText2 = '';
    this.fullText = 'Why there are more than one Bitcoin rate?';
    this.fullText2 = 'The Bitcoin owners trade via different websites. Each website has it\'s own rate, similar to banks\' currency rates.';
    this.now = new Date();

    this.currentTime = [ this.now.getMonth() + 1, this.now.getDate(), this.now.getFullYear() ];
  }

  ngOnInit() {
    this.coindesk();
    this.bitstamp();
    this.hitbtc();
    this.explanation();
    this.startTimer();

  }

  async coindesk() {
    try {
     const response = await this.appService.coindesk();
     const res = response.json();
     this.coindeskRate = res.bpi.USD.rate;
     this.coindeskRate = this.coindeskRate.replace(/,/g, '');
     this.coindeskRate = this.coindeskRate.substring(0, this.coindeskRate.length - 2);
   } catch (ex) {
     console.error(`AppComponent::get:: errored with: ${ex}`);
   }
  }

  async bitstamp() {
    try {
     const response = await this.appService.bitstamp();
     const res = response.json();
     this.bitstampRate = res.last;
   } catch (ex) {
     console.error(`AppComponent::get:: errored with: ${ex}`);
   }
  }

  async hitbtc() {
    try {
     const response = await this.appService.hitbtc();
     const res = response.json();
     this.hitbtcRate = res.last;
   } catch (ex) {
     console.error(`AppComponent::get:: errored with: ${ex}`);
   }
  }

  startTimer () {
    const timer = TimerObservable.create(60000, 60000);
    this.subscription = timer.subscribe(t => {
      this.coindesk();
      this.bitstamp();
      this.hitbtc();
      this.explanation();
       });
  }

  explanation() {
    const timer = TimerObservable.create(100, 100);
    this.subscription2 = timer.subscribe(t => {
      if (this.pos <= this.fullText.length - 1) {
        this.partialText = this.partialText + this.fullText[this.pos];
        this.pos++;
        } else {
          if (this.pos2 <= this.fullText2.length - 1) {
            this.partialText2 = this.partialText2 + this.fullText2[this.pos2];
            this.pos2++;
           } else {
            this.subscription2.unsubscribe();
           }
        }
       });
   }

}

