import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseProgressComponent } from './admin-course-progress.component';

describe('AdminCourseProgressComponent', () => {
  let component: AdminCourseProgressComponent;
  let fixture: ComponentFixture<AdminCourseProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCourseProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
