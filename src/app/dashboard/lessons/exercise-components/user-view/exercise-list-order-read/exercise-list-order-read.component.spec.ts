import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseListOrderReadComponent} from './exercise-list-order-read.component';

describe('ExerciseListOrderReadComponent', () => {
    let component: ExerciseListOrderReadComponent;
    let fixture: ComponentFixture<ExerciseListOrderReadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExerciseListOrderReadComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExerciseListOrderReadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
