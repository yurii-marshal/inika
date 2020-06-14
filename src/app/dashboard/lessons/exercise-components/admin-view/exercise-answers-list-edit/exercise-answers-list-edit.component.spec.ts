import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseAnswersListEditComponent} from './exercise-answers-list-edit.component';

describe('ExerciseAnswersListEditComponent', () => {
  let component: ExerciseAnswersListEditComponent;
  let fixture: ComponentFixture<ExerciseAnswersListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseAnswersListEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseAnswersListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
