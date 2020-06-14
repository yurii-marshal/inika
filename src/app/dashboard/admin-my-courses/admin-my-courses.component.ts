import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'in-admin-my-courses',
	templateUrl: './admin-my-courses.component.html',
	styleUrls: [ './admin-my-courses.component.scss' ]
})
export class AdminMyCoursesComponent implements OnInit {
	courseCardBgUrl = '../../../assets/images/course-1.jpg';

	constructor() {}

	ngOnInit() {}
}
