import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-checkboxes-edit',
  templateUrl: './exercise-checkboxes-edit.component.html',
  styleUrls: ['./exercise-checkboxes-edit.component.scss']
})
export class ExerciseCheckboxesEditComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;
  public data;
  @Output() onRemoveExercise: EventEmitter<any> = new EventEmitter();

  constructor(public lessonsService: LessonsApiService) {
  }

  ngOnInit() {
    this.data = this.lessonsService.lessonEntity[this.type][this.index];
    if (this.data['selected']) {
      this.data['selected'].forEach((item) => {
        item = item === '1';
      });
    } else {
      this.data['selected'] = [];
      this.data['inputs'] = [];
    }
  }

  checkValidation() {
    for (let i = 0; i < this.data['inputs'].length; i++) {
      if (this.data['inputs'][i]['text'] === '') {
        this.data['validationStatus'] = 'invalid';
        return;
      }
    }
    this.data['validationStatus'] = 'valid';
  }

  public removeExercise() {
    this.onRemoveExercise.emit();
  }
}
