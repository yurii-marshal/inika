import {Component, Input, OnInit} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-image-read',
  templateUrl: './exercise-image-read.component.html',
  styleUrls: ['./exercise-image-read.component.scss']
})
export class ExerciseImageReadComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;
  public exercise;

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.exercise = this.lessonService.lessonEntity[this.type][this.index];
    this.exercise['data']['srcURLs'] = this.exercise['data']['sentencesList'].map(a => a['mediaData']);
  }
}
