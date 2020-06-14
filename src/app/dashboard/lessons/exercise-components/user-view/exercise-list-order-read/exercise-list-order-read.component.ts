import {Component, Input, OnInit} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-list-order-read',
  templateUrl: './exercise-list-order-read.component.html',
  styleUrls: ['./../exercise-answers-list-read/exercise-answers-list-read.component.scss']
})
export class ExerciseListOrderReadComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;

  public exercise;

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.exercise = this.lessonService.userLesson[this.type][this.index];
  }

  onUserItemDrop(e, i, k) {
    if (this.exercise['data']['sentencesList'][i]['dropAnswerSamples'][k]) {
      return;
    } else {
      this.exercise['data']['sentencesList'][i].dropTestSamples.splice(this.exercise['data']['sentencesList'][i].dropTestSamples.indexOf(e.dragData), 1);
      this.exercise['data']['sentencesList'][i]['dropAnswerSamples'][k] = e.dragData;
    }
  }

  removeUserDropItem(i, k) {
    // console.log(this.exercise['data']['sentencesList'][i]['dropAnswerSamples']);
    const index = this.exercise['data']['sentencesList'][i]['dropTestSamples'].findIndex(x => x.id === this.exercise['data']['sentencesList'][i]['dropAnswerSamples'][k].id);
    if (index === -1) {
      this.exercise['data']['sentencesList'][i]['dropTestSamples'].push(this.exercise['data']['sentencesList'][i]['dropAnswerSamples'][k]);
    }
    this.exercise['data']['sentencesList'][i]['dropAnswerSamples'][k] = '';
  }

  resetUserAnswer(i) {
    this.exercise['feedback'][i]['isError'] = false;
    this.exercise['feedback'][i]['isSuccess'] = false;
  }
}
