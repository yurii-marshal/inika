import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseImageReadComponent} from './exercise-image-read.component';

describe('ExerciseImageReadComponent', () => {
  let component: ExerciseImageReadComponent;
  let fixture: ComponentFixture<ExerciseImageReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseImageReadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseImageReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
