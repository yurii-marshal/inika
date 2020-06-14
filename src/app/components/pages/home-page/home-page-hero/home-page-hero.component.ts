import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'in-home-page-hero',
    templateUrl: './home-page-hero.component.html',
    styleUrls: ['./home-page-hero.component.scss']
})
export class HomePageHeroComponent implements OnInit {
    public title = 'Начни изучать Английский Online';
    public subtitle = 'Бесплатный пробный урок';

    constructor() {
    }

    ngOnInit() {
    }

}
