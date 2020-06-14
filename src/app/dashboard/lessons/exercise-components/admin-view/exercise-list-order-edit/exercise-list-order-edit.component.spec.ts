import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseListOrderEditComponent} from './exercise-list-order-edit.component';

describe('ExerciseListOrderEditComponent', () => {
    let component: ExerciseListOrderEditComponent;
    let fixture: ComponentFixture<ExerciseListOrderEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExerciseListOrderEditComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExerciseListOrderEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
