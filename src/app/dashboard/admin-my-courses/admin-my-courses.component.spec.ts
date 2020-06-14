import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMyCoursesComponent } from './admin-my-courses.component';

describe('AdminMyCoursesComponent', () => {
	let component: AdminMyCoursesComponent;
	let fixture: ComponentFixture<AdminMyCoursesComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ AdminMyCoursesComponent ]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminMyCoursesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
