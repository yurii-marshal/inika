import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyCardComponent } from './vocabulary-card.component';

describe('VocabularyCardComponent', () => {
  let component: VocabularyCardComponent;
  let fixture: ComponentFixture<VocabularyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
