import {Component, Input, OnInit} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-audio-read',
  templateUrl: './exercise-audio-read.component.html',
  styleUrls: ['./exercise-audio-read.component.scss']
})
export class ExerciseAudioReadComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;
  public exercise;

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.exercise = this.lessonService.lessonEntity[this.type][this.index];
  }
}
