import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LessonPageMaterialsComponent} from './lesson-page-materials.component';

describe('LessonPageMaterialsComponent', () => {
	let component: LessonPageMaterialsComponent;
	let fixture: ComponentFixture<LessonPageMaterialsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LessonPageMaterialsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LessonPageMaterialsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
