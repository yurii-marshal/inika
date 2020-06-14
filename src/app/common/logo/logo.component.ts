import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'in-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

    @Input() public color: string;
    @Input() public width: string;
    @Input() public height: string;
    @Input() public type: string;

    constructor() {
    }

    ngOnInit() {
    }

}
