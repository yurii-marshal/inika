import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherToolbarComponent } from './teacher-toolbar.component';

describe('TeacherToolbarComponent', () => {
  let component: TeacherToolbarComponent;
  let fixture: ComponentFixture<TeacherToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
