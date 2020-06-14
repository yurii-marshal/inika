import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStartingPageComponent } from './teacher-starting-page.component';

describe('TeacherStartingPageComponent', () => {
  let component: TeacherStartingPageComponent;
  let fixture: ComponentFixture<TeacherStartingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStartingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStartingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
