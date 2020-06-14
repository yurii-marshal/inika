import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseImageComponent} from '../../user-view/exercise-image/exercise-image.component';

describe('ExerciseImageComponent', () => {
    let component: ExerciseImageComponent;
    let fixture: ComponentFixture<ExerciseImageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExerciseImageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExerciseImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
