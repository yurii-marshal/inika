import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseAudioReadComponent} from './exercise-audio-read.component';

describe('ExerciseAudioReadComponent', () => {
  let component: ExerciseAudioReadComponent;
  let fixture: ComponentFixture<ExerciseAudioReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseAudioReadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseAudioReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
