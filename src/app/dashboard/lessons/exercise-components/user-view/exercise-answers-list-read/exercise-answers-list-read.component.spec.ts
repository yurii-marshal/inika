import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseAnswersListReadComponent} from './exercise-answers-list-read.component';

describe('ExerciseAnswersListReadComponent', () => {
  let component: ExerciseAnswersListReadComponent;
  let fixture: ComponentFixture<ExerciseAnswersListReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseAnswersListReadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseAnswersListReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
