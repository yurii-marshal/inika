import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLessonsCardComponent } from './teacher-lessons-card.component';

describe('TeacherLessonsCardComponent', () => {
  let component: TeacherLessonsCardComponent;
  let fixture: ComponentFixture<TeacherLessonsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherLessonsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherLessonsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
