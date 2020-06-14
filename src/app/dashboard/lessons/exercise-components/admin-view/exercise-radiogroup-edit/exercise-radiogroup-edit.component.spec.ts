import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseRadiogroupEditComponent} from './exercise-radiogroup-edit.component';

describe('ExerciseRadiogroupEditComponent', () => {
  let component: ExerciseRadiogroupEditComponent;
  let fixture: ComponentFixture<ExerciseRadiogroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseRadiogroupEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseRadiogroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
