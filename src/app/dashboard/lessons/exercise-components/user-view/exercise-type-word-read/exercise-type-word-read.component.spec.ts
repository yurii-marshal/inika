import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseTypeWordReadComponent} from './exercise-type-word-read.component';

describe('ExerciseTypeWordReadComponent', () => {
  let component: ExerciseTypeWordReadComponent;
  let fixture: ComponentFixture<ExerciseTypeWordReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseTypeWordReadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseTypeWordReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
