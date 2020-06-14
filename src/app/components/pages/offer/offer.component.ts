import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'in-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goToTop() {
    window.scrollTo(0, 0);
  }

}
