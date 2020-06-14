import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'in-page-banner',
    templateUrl: './page-banner.component.html',
    styleUrls: ['./page-banner.component.scss']
})
export class PageBannerComponent implements OnInit {

    @Input() public title: string;
    @Input() public description: string;

    constructor() {
    }

    ngOnInit() {
    }

}
