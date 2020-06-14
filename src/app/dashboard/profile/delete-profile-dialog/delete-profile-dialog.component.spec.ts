import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfileDialogComponent } from './delete-profile-dialog.component';

describe('DeleteProfileDialogComponent', () => {
  let component: DeleteProfileDialogComponent;
  let fixture: ComponentFixture<DeleteProfileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProfileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
