import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {TransitionsService} from '../../../../../services/transitions.service';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-user-view-frame',
  templateUrl: './user-view-frame.component.html',
  styleUrls: ['./user-view-frame.component.scss'],
})
export class UserViewFrameComponent implements OnInit, OnDestroy {
  @Input() pageType: string;
  @Input() dragulaOptionName: string;

  constructor(private transitionsService: TransitionsService,
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
  }

  ngOnDestroy() {
    // this.dragulaService.destroy('TESTS');
  }
}
