import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TransitionsService} from '../../../../services/transitions.service';
import {LessonsApiService} from '../../../../services/api/lessons-api.service';
import {DragulaService} from 'ng2-dragula';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'in-lesson-content-frame',
  templateUrl: './lesson-content-frame.component.html',
  styleUrls: ['./lesson-content-frame.component.scss'],
})
export class LessonContentFrameComponent implements OnInit, OnDestroy {
  @Input() adminRole: boolean;
  @Input() pageType: string;
  @Input() dragulaOptionName: string;

  constructor(private transitionsService: TransitionsService,
              public authService: AuthService,
              public lessonsService: LessonsApiService,
              private dragulaService: DragulaService) {
    if (this.dragulaOptionName) {
      this.dragulaService.setOptions(this.dragulaOptionName, {
        moves: (el, container, handle) => {
          return handle.className === 'header-section';
        }
      });
    }
  }

  ngOnInit() {
    this.transitionsService.currentLessonBuilderToggle.subscribe((data) => {
      this.adminRole = data;
    });
  }

  ngOnDestroy() {
    // this.dragulaService.destroy('TESTS');
  }
}
