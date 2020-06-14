import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserViewFrameComponent} from './user-view-frame.component';

describe('UserViewFrameComponent', () => {
  let component: UserViewFrameComponent;
  let fixture: ComponentFixture<UserViewFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewFrameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
