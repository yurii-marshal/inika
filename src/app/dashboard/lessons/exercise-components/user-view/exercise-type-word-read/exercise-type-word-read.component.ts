import {Component, Input, OnInit} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-type-word-read',
  templateUrl: './exercise-type-word-read.component.html',
  styleUrls: ['./exercise-type-word-read.component.scss']
})
export class ExerciseTypeWordReadComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;

  public exercise;

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.exercise = this.lessonService.userLesson[this.type][this.index];
    if (this.exercise['feedback'].length === 0) {
      this.clearFeedback();
    }
  }

  clearFeedback() {
    if (this.exercise) {
      this.exercise['data']['sentencesList'].forEach((item, i) => {
        this.exercise['feedback'][i] = [];
        item.sentenceSamples.forEach((sample, j) => {
          this.exercise['feedback'][i][j] = [];
          sample.line.forEach((line, k) => {
            this.exercise['feedback'][i][j][k] = {};
            if (line.type === 'input') {
              this.exercise['feedback'][i][j][k] = {
                isError: false,
                isSuccess: false
              };
            }
          });
        });
      });
    }
  }
}
