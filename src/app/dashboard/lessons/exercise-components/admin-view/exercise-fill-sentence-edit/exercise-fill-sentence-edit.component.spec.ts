import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseFillSentenceEditComponent} from './exercise-fill-sentence-edit.component';

describe('ExerciseFillSentenceEditComponent', () => {
  let component: ExerciseFillSentenceEditComponent;
  let fixture: ComponentFixture<ExerciseFillSentenceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseFillSentenceEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseFillSentenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
