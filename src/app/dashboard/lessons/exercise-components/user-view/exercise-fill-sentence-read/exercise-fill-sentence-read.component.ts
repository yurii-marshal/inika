import {Component, Input, OnInit} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-fill-sentence-read',
  templateUrl: './exercise-fill-sentence-read.component.html',
  styleUrls: ['./exercise-fill-sentence-read.component.scss']
})
export class ExerciseFillSentenceReadComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;
  public exercise;

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.exercise = this.lessonService.userLesson[this.type][this.index];
  }

  onUserItemDrop(e: any, i) {
    if (!this.exercise['data']['sentencesList'][i]['answerSample']) {
      this.exercise['data']['dragItems'].splice(this.exercise['data']['dragItems'].indexOf(e.dragData), 1);
      this.exercise['data']['sentencesList'][i]['answerSample'] = e.dragData;
    }
  }

  removeUserDropItem(i) {
    this.exercise['data']['dragItems'].push(this.exercise['data']['sentencesList'][i]['answerSample']);
    delete this.exercise['data']['sentencesList'][i]['answerSample'];
  }
}
