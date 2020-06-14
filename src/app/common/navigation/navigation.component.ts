import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

interface NavigationLink {
    type: 'internal' | 'external';
    value: string;
    text: string;
}

@Component({
    selector: 'in-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    animations: [
        trigger('navigationState', [
            state('visible', style({
                transform: 'translate3d(0, 0, 0)',
                position: 'fixed'
            })),
            state('hidden', style({
                transform: 'translate3d(100%, 0, 0)',
                position: 'absolute'
            })),
            transition('hidden <=> visible', animate('300ms ease-in-out'))
        ]),
        trigger('overlayState', [
            state('visible', style({
                opacity: 1
            })),
            state('void', style({
                opacity: 0
            })),
            transition('void <=> visible', animate('300ms ease-in-out'))
        ])
    ]
})
export class NavigationComponent implements OnInit {

    public state = 'hidden';

    @Input() public color: string;

    public links: NavigationLink[] = [
        {
            type: 'internal',
            value: '/',
            text: 'Главная'
        },
        {
            type: 'internal',
            value: '/courses',
            text: 'Курсы'
        },
        {
            type: 'internal',
            value: '/prices',
            text: 'Стоимость'
        },
        {
            type: 'internal',
            value: '/contact',
            text: 'Контакты'
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }

    public toggleNavigation(): void {
        this.state = this.state === 'visible' ? 'hidden' : 'visible';
    }

    public login() {
    }

}
