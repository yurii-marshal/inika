import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLessonDialogComponent } from './delete-lesson-dialog.component';

describe('DeleteLessonDialogComponent', () => {
  let component: DeleteLessonDialogComponent;
  let fixture: ComponentFixture<DeleteLessonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLessonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLessonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
