import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseFillSentenceReadComponent} from './exercise-fill-sentence-read.component';

describe('ExerciseFillSentenceReadComponent', () => {
  let component: ExerciseFillSentenceReadComponent;
  let fixture: ComponentFixture<ExerciseFillSentenceReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseFillSentenceReadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseFillSentenceReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
