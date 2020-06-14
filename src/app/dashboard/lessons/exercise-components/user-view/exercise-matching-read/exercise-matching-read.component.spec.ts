import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseMatchingReadComponent} from './exercise-matching-read.component';

describe('ExerciseMatchingReadComponent', () => {
    let component: ExerciseMatchingReadComponent;
    let fixture: ComponentFixture<ExerciseMatchingReadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExerciseMatchingReadComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExerciseMatchingReadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
