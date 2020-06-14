import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {LessonContentFrameComponent} from './lesson-content-frame.component';

describe('LessonContentFrameComponent', () => {
  let component: LessonContentFrameComponent;
  let fixture: ComponentFixture<LessonContentFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonContentFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonContentFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
