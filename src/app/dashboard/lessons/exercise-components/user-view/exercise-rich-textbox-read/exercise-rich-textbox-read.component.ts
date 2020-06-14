import {Component, Input, OnInit} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-rich-textbox-read',
  templateUrl: './exercise-rich-textbox-read.component.html',
  styleUrls: ['./exercise-rich-textbox-read.component.scss']
})
export class ExerciseRichTextboxReadComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;
  public exercise;

  constructor(public lessonService: LessonsApiService) {
   }

  ngOnInit() {
    this.exercise = this.lessonService.lessonEntity[this.type][this.index];
  }
}
