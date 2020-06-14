import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'in-lesson-page-tests',
  templateUrl: './lesson-page-tests.component.html',
  styleUrls: ['./lesson-page-tests.component.scss'],
})
export class LessonPageTestsComponent implements OnInit, OnDestroy {
  public adminRole: boolean;
  public pageType = 'tests';

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // this.dragulaService.destroy('TESTS');
  }
}
