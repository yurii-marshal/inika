import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLessonDetailsTableComponent } from './teacher-lesson-details-table.component';

describe('TeacherLessonDetailsTableComponent', () => {
  let component: TeacherLessonDetailsTableComponent;
  let fixture: ComponentFixture<TeacherLessonDetailsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherLessonDetailsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherLessonDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
