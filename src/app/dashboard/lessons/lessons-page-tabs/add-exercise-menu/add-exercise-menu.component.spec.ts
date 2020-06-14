import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AddExerciseMenuComponent} from './add-exercise-menu.component';

describe('AddExerciseMenuComponent', () => {
  let component: AddExerciseMenuComponent;
  let fixture: ComponentFixture<AddExerciseMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExerciseMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExerciseMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
