import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AdminViewFrameComponent} from './admin-view-frame.component';

describe('AdminViewFrameComponent', () => {
  let component: AdminViewFrameComponent;
  let fixture: ComponentFixture<AdminViewFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewFrameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
