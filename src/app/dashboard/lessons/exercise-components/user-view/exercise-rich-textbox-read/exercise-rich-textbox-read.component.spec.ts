import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseRichTextboxReadComponent} from './exercise-rich-textbox-read.component';

describe('ExerciseRichTextboxReadComponent', () => {
  let component: ExerciseRichTextboxReadComponent;
  let fixture: ComponentFixture<ExerciseRichTextboxReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseRichTextboxReadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseRichTextboxReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
