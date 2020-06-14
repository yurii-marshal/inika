import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseReferenceReadComponent} from './exercise-reference-read.component';

describe('ExerciseReferenceReadComponent', () => {
  let component: ExerciseReferenceReadComponent;
  let fixture: ComponentFixture<ExerciseReferenceReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseReferenceReadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseReferenceReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
