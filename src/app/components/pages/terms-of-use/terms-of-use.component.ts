import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'in-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goToTop() {
    window.scrollTo(0, 0);
  }

}
