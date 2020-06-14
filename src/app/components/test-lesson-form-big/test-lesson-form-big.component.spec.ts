import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLessonFormBigComponent } from './test-lesson-form-big.component';

describe('TestLessonFormBigComponent', () => {
	let component: TestLessonFormBigComponent;
	let fixture: ComponentFixture<TestLessonFormBigComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ TestLessonFormBigComponent ]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TestLessonFormBigComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
