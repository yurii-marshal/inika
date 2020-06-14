import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseTypeWordEditComponent} from './exercise-type-word-edit.component';

describe('ExerciseTypeWordEditComponent', () => {
  let component: ExerciseTypeWordEditComponent;
  let fixture: ComponentFixture<ExerciseTypeWordEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseTypeWordEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseTypeWordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
