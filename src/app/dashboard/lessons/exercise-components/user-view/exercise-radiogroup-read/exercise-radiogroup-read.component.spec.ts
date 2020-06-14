import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseRadiogroupReadComponent} from './exercise-radiogroup-read.component';

describe('ExerciseRadiogroupReadComponent', () => {
  let component: ExerciseRadiogroupReadComponent;
  let fixture: ComponentFixture<ExerciseRadiogroupReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseRadiogroupReadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseRadiogroupReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
