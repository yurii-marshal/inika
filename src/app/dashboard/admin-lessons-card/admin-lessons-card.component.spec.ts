import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLessonsCardComponent } from './admin-lessons-card.component';

describe('AdminLessonsCardComponent', () => {
  let component: AdminLessonsCardComponent;
  let fixture: ComponentFixture<AdminLessonsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLessonsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLessonsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
