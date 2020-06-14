import {Component, Input, OnInit} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-matching-read',
  templateUrl: './exercise-matching-read.component.html',
  styleUrls: ['./exercise-matching-read.component.scss']
})
export class ExerciseMatchingReadComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;

  public exercise;

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.exercise = this.lessonService.userLesson[this.type][this.index];
    this.exercise['data']['sentencesList'].forEach(() => {
      this.exercise['feedback'].push({
        isError: false,
        isSuccess: false
      });
    });
  }

  onItemDrop(e: any, i) {
    this.exercise['data']['sentencesList'][i]['dropSample'] = e.dragData;
    this.exercise['data']['dragItems'].forEach((item, index) => {
      if (item === e.dragData) {
        this.exercise['data']['dragItems'].splice(index, 1);
      }
    });
  }

  removeDropItem(i) {
    this.exercise['data']['dragItems'].push(this.exercise['data']['sentencesList'][i]['dropSample']);
    delete this.exercise['data']['sentencesList'][i]['dropSample'];
  }
}
