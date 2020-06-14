import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseAudioEditComponent} from './exercise-audio-edit.component';

describe('ExerciseAudioEditComponent', () => {
  let component: ExerciseAudioEditComponent;
  let fixture: ComponentFixture<ExerciseAudioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseAudioEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseAudioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
