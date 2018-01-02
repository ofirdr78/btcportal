import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menubar: { name: string; path: string}[];
  constructor() {

    this.menubar = [
      { name: 'Homepage', path: '/home' },
      { name: 'BTC Rates', path: '/home/about' },
      { name: 'Bitcoin?', path: '/home/bitcoin'},
      { name: 'Currencies', path: '/home/currencies' },
      { name: 'About Us', path: '/home/about' }];

   }

  ngOnInit() {
  }

}
