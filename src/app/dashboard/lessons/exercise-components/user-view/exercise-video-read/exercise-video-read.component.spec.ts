import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseVideoReadComponent} from './exercise-video-read.component';

describe('ExerciseVideoReadComponent', () => {
  let component: ExerciseVideoReadComponent;
  let fixture: ComponentFixture<ExerciseVideoReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseVideoReadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseVideoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
