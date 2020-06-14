import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'in-lesson-page-hometasks',
  templateUrl: './lesson-page-hometasks.component.html',
  styleUrls: ['./lesson-page-hometasks.component.scss'],
})
export class LessonPageHometasksComponent implements OnInit, OnDestroy {
  public adminRole: boolean;
  public pageType = 'homeworks';

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
