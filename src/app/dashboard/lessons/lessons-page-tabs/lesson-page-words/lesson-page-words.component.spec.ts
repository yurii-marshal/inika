import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {LessonPageWordsComponent} from './lesson-page-words.component';

describe('LessonPageWordsComponent', () => {
  let component: LessonPageWordsComponent;
  let fixture: ComponentFixture<LessonPageWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonPageWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPageWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
