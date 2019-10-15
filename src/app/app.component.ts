import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  coindeskRate: string;
  bitstampRate: string;
  now: Date;
  currentTime: any;
  fullText: string;
  fullText2: string;
  partialText: string;
  partialText2: string;
  pos: number;
  pos2: number;
  cursor: string;
  companyLogo: string;
  companyLogo2: string;
  private tick: string;
  private subscription: Subscription;
  private subscription2: Subscription;
  private updateSubscription: Subscription;
  constructor(private appService: AppService) {
    this.coindeskRate = '';
    this.bitstampRate = '';
    this.pos = 0;
    this.pos2 = 0;
    this.cursor = '_';
    this.partialText = '';
    this.partialText2 = '';
    this.companyLogo = 'BTCportal. All Bitcoin rates.';
    this.companyLogo2 = 'All Bitcoin rates.';
    this.fullText = 'Why there are more than one Bitcoin rate?';
    this.fullText2 = 'The Bitcoin owners trade via different websites. Each website has it\'s own rate, similar to the bank currency rates.';
    this.now = new Date();

    this.currentTime = [ this.now.getMonth() + 1, this.now.getDate(), this.now.getFullYear() ];
  }

  ngOnInit() {
    this.coindesk();
    this.bitstamp();
    this.explanation();
    this.startTimer();
    setInterval(function() {
      location.reload();
    }, 60000);
  }

  coindesk() {
    try {
     const response = this.appService.coindesk();
     response.subscribe(data => {
      this.coindeskRate = data.bpi.USD.rate;
      this.coindeskRate = this.coindeskRate.replace(/,/g, '');
      this.coindeskRate = this.coindeskRate.substring(0, this.coindeskRate.length - 2);
     });
   } catch (ex) {
     console.error(`AppComponent::get:: errored with: ${ex}`);
   }
  }

   bitstamp() {
    try {
      const response = this.appService.bitstamp();
      response.subscribe(data => {
       this.bitstampRate = data.last;
   });
     } catch (ex) {
     console.error(`AppComponent::get:: errored with: ${ex}`);
   }
  }

 
  startTimer () {
    const timer = TimerObservable.create(60000, 60000);
    this.subscription = timer.subscribe(t => {
      this.coindesk();
      this.bitstamp();
      this.explanation();
       });
  }

  explanation() {
    const timer = TimerObservable.create(70, 70);
    this.subscription2 = timer.subscribe(t => {
      if (this.pos <= this.fullText.length - 1) {
        this.partialText = this.partialText.replace(/_/g, '');
        this.partialText = this.partialText + this.fullText[this.pos] + this.cursor;
        this.pos++;
        } else {
          this.partialText = this.partialText.replace(/_/g, '');
          if (this.pos2 <= this.fullText2.length - 1) {
            this.partialText2 = this.partialText2.replace(/_/g, '');
            this.partialText2 = this.partialText2 + this.fullText2[this.pos2] + this.cursor;
            this.pos2++;
           } else {
            this.partialText = '';
            this.partialText2 = '';
            this.pos = 0;
            this.pos2 = 0;
         //   this.subscription2.unsubscribe();
           }
        }
       });
   }

}

