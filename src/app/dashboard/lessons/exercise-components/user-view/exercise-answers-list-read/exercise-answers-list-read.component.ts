import {Component, Input, OnInit} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-answers-list-read',
  templateUrl: './exercise-answers-list-read.component.html',
  styleUrls: ['./exercise-answers-list-read.component.scss']
})
export class ExerciseAnswersListReadComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;

  public exercise;

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.exercise = this.lessonService.userLesson[this.type][this.index];
  }

  setAnswer(i, val) {
    this.exercise['data']['sentencesList'][i]['dropSamples'].forEach((item, index) => {
      item.answer = val === item['id'];
    });
  }
}
