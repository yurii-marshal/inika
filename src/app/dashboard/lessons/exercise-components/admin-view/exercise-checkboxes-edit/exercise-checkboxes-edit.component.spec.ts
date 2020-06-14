import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseCheckboxesEditComponent} from './exercise-checkboxes-edit.component';

describe('ExerciseCheckboxesEditComponent', () => {
  let component: ExerciseCheckboxesEditComponent;
  let fixture: ComponentFixture<ExerciseCheckboxesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseCheckboxesEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseCheckboxesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
