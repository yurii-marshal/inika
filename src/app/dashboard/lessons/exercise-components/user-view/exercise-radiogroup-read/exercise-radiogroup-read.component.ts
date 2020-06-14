import {Component, Input, OnInit} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-radiogroup-read',
  templateUrl: './exercise-radiogroup-read.component.html',
  styleUrls: ['./exercise-radiogroup-read.component.scss']
})
export class ExerciseRadiogroupReadComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;
  public exercise;
  constructor(public lessonsService: LessonsApiService) {
  }

  ngOnInit() {
    this.exercise = this.lessonsService.userLesson[this.type][this.index];
    if (!this.exercise['data']['selected']) {
      this.exercise['data']['selected'] = [];
      this.exercise['data']['inputs'] = [];
    }
  }
}
