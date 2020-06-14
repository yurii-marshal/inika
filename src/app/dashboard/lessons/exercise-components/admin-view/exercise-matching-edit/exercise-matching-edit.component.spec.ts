import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseMatchingEditComponent} from './exercise-matching-edit.component';

describe('ExerciseMatchingComponent', () => {
    let component: ExerciseMatchingEditComponent;
    let fixture: ComponentFixture<ExerciseMatchingEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExerciseMatchingEditComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExerciseMatchingEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
