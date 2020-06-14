import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSingleLessonComponent } from './teacher-single-lesson.component';

describe('TeacherSingleLessonComponent', () => {
  let component: TeacherSingleLessonComponent;
  let fixture: ComponentFixture<TeacherSingleLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSingleLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSingleLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
