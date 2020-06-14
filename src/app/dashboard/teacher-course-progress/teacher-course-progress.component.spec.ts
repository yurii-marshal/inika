import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseProgressComponent } from './teacher-course-progress.component';

describe('TeacherCourseProgressComponent', () => {
  let component: TeacherCourseProgressComponent;
  let fixture: ComponentFixture<TeacherCourseProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCourseProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCourseProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
