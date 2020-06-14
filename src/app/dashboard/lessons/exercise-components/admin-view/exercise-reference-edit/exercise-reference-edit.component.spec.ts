import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ExerciseReferenceEditComponent} from './exercise-reference-edit.component';

describe('ExerciseReferenceEditComponent', () => {
  let component: ExerciseReferenceEditComponent;
  let fixture: ComponentFixture<ExerciseReferenceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseReferenceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseReferenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
