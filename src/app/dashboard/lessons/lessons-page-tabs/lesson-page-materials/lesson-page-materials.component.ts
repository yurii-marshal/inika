import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'in-lesson-page-materials',
  templateUrl: './lesson-page-materials.component.html',
  styleUrls: ['./lesson-page-materials.component.scss'],
})
export class LessonPageMaterialsComponent implements OnInit, OnDestroy {
  public adminRole: boolean;
  public pageType = 'materials';

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
