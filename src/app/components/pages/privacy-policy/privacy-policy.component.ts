import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'in-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})

export class PrivacyPolicyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goToTop() {
    window.scrollTo(0, 0);
  }

}
