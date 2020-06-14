import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseRichTextboxEditComponent} from './exercise-rich-textbox-edit.component';

describe('ExerciseRichTextboxEditComponent', () => {
  let component: ExerciseRichTextboxEditComponent;
  let fixture: ComponentFixture<ExerciseRichTextboxEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseRichTextboxEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseRichTextboxEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
