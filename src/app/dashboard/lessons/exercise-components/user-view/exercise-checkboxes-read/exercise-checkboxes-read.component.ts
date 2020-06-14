import {Component, Input, OnInit} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-checkboxes-read',
  templateUrl: './exercise-checkboxes-read.component.html',
  styleUrls: ['./exercise-checkboxes-read.component.scss']
})
export class ExerciseCheckboxesReadComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;
  public exercise;

  constructor(public lessonsService: LessonsApiService) {
  }

  ngOnInit() {
    this.exercise = this.lessonsService.userLesson[this.type][this.index];
    if (this.exercise['data']['selected']) {
      this.exercise['data']['selected'].forEach((item) => {
        item = item === '1';
      });
    } else {
      this.exercise['data']['selected'] = [];
      this.exercise['data']['inputs'] = [];
    }
  }
}
