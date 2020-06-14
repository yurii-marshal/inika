import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LessonPageHometasksComponent} from './lesson-page-hometasks.component';

describe('LessonPageHometasksComponent', () => {
	let component: LessonPageHometasksComponent;
	let fixture: ComponentFixture<LessonPageHometasksComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LessonPageHometasksComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LessonPageHometasksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
