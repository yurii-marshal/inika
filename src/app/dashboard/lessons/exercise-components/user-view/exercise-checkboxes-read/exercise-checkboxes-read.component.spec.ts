import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseCheckboxesReadComponent} from './exercise-checkboxes-read.component';

describe('ExerciseCheckboxesReadComponent', () => {
  let component: ExerciseCheckboxesReadComponent;
  let fixture: ComponentFixture<ExerciseCheckboxesReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseCheckboxesReadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseCheckboxesReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
