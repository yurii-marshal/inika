import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseVideoEditComponent} from './exercise-video-edit.component';

describe('ExerciseVideoEditComponent', () => {
  let component: ExerciseVideoEditComponent;
  let fixture: ComponentFixture<ExerciseVideoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseVideoEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseVideoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
