import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-type-word-edit',
  templateUrl: './exercise-type-word-edit.component.html',
  styleUrls: ['./exercise-type-word-edit.component.scss']
})
export class ExerciseTypeWordEditComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;

  public data;
  @Output() onRemoveExercise: EventEmitter<any> = new EventEmitter();

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.data = this.lessonService.lessonEntity[this.type][this.index]['data'];
  }

  addSentence() {
    this.data['sentencesList'].push({
      id: null,
      sentenceSamples: [
        {
          line: [],
          id: null
        }
      ]
    });
    this.data['validationStatus'] = 'invalid';
  }

  addTextSample(i, j) {
    this.data['sentencesList'][i]['sentenceSamples'][j]['line'].push({
      type: 'text',
      value: '',
      id: null
    });
    this.data['validationStatus'] = 'invalid';
  }

  addInputSample(i, j) {
    this.data['sentencesList'][i]['sentenceSamples'][j]['line'].push({
      type: 'input',
      value: '',
      id: null
    });
    this.data['validationStatus'] = 'invalid';
  }

  returnLine(i, j) {
    this.data['sentencesList'][i]['sentenceSamples'].push({
      line: [],
      id: null
    });
    this.data['validationStatus'] = 'invalid';
  }

  deleteLine(i, j) {
    this.data['sentencesList'][i]['sentenceSamples'].splice(j, 1);
    this.checkValidation();
  }

  deleteSentence(index) {
    const id = this.data['sentencesList'][index]['id'];
    if (id) {
      this.lessonService.deleteSentenceById(id,
        (data) => {
          this.data['sentencesList'].splice(index, 1);
          this.checkValidation();
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      this.data['sentencesList'].splice(index, 1);
      this.checkValidation();
    }
  }

  checkValidation() {
    for (let i = 0; i < this.data['sentencesList'].length; i++) {
      for (let j = 0; j < this.data['sentencesList'][i]['sentenceSamples'].length; j++) {
        if (this.data['sentencesList'][i]['sentenceSamples'][j]['line'].length === 0) {
          this.data['validationStatus'] = 'invalid';
          return;
        }
        for (let k = 0; k < this.data['sentencesList'][i]['sentenceSamples'][j]['line'].length; k++) {
          if (this.data['sentencesList'][i]['sentenceSamples'][j]['line'][k]['value'] === '') {
            this.data['validationStatus'] = 'invalid';
            return;
          }
        }
      }
    }
    this.data['validationStatus'] = 'valid';
  }

  public removeExercise() {
    this.onRemoveExercise.emit();
  }
}
