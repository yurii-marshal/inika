import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'in-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  scrollTop(event) {
    window.scroll(0, 0);
  }
}
