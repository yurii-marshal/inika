import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {TransitionsService} from '../../../../../services/transitions.service';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-admin-view-frame',
  templateUrl: './admin-view-frame.component.html',
  styleUrls: ['./admin-view-frame.component.scss'],
})
export class AdminViewFrameComponent implements OnInit, OnDestroy {
  @Input() pageType: string;
  @Input() dragulaOptionName: string;

  constructor(public lessonsService: LessonsApiService,
              private transitionsService: TransitionsService,
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
    // console.log();
  }

  ngOnDestroy() {
  }
}
