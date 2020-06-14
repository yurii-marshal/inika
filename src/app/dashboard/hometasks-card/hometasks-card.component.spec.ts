import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HometasksCardComponent } from './hometasks-card.component';

describe('HometasksCardComponent', () => {
  let component: HometasksCardComponent;
  let fixture: ComponentFixture<HometasksCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HometasksCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HometasksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
