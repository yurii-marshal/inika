import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'in-admin-navigation',
	templateUrl: './admin-navigation.component.html',
	styleUrls: [ './admin-navigation.component.scss' ]
})
export class AdminNavigationComponent implements OnInit {
	studentAvatarUrl = '../../../assets/images/testimonial1.jpg';

	constructor() {}

	ngOnInit() {}
}
