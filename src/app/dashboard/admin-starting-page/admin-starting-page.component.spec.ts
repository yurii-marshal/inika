import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStartingPageComponent } from './admin-starting-page.component';

describe('AdminStartingPageComponent', () => {
	let component: AdminStartingPageComponent;
	let fixture: ComponentFixture<AdminStartingPageComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ AdminStartingPageComponent ]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminStartingPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
