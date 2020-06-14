import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {LessonPageTestsComponent} from './lesson-page-tests.component';

describe('LessonPageTestsComponent', () => {
  let component: LessonPageTestsComponent;
  let fixture: ComponentFixture<LessonPageTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonPageTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPageTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
