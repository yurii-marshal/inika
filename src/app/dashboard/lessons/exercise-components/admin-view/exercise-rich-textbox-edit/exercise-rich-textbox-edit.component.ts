import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-rich-textbox-edit',
  templateUrl: './exercise-rich-textbox-edit.component.html',
  styleUrls: ['./exercise-rich-textbox-edit.component.scss']
})
export class ExerciseRichTextboxEditComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;
  public data;
  @Output() onRemoveExercise: EventEmitter<any> = new EventEmitter();
  isModeView: boolean;

  constructor(public lessonService: LessonsApiService) {
   }

  ngOnInit() {
    this.data = this.lessonService.lessonEntity[this.type][this.index]['data'];
  }

  public removeExercise() {
    this.onRemoveExercise.emit();
  }
}
