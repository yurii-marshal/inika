import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-answers-list-edit',
  templateUrl: './exercise-answers-list-edit.component.html',
  styleUrls: ['./exercise-answers-list-edit.component.scss']
})
export class ExerciseAnswersListEditComponent implements OnInit {
  @Output() onRemoveExercise: EventEmitter<any> = new EventEmitter();
  @Input() index: any;
  @Input() type: any;

  public data;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public userAnswerList = [];

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.data = this.lessonService.lessonEntity[this.type][this.index]['data'];
    this.data['sentencesList'].forEach((item, i) => {
      item.dropSamples.forEach((sample, index) => {
        if (sample.answer) {
          sample.answer = true;
          this.userAnswerList[i] = sample.text;
        } else {
          sample.answer = false;
        }
      });
    });
  }

  addSentence() {
    this.data['sentencesList'].push({
      id: null,
      textSamples: ['', ''],
      dropSamples: []
    });
    this.data['validationStatus'] = 'invalid';
  }

  deleteSentence(index) {
    const id = this.data['sentencesList'][index]['id'];
    if (id) {
      this.lessonService.deleteSentenceById(id,
        (data) => {
          this.onDeleteSentence(index);
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      this.onDeleteSentence(index);
    }
  }

  private onDeleteSentence(index) {
    this.data['sentencesList'].splice(index, 1);
    this.checkValidation();
  }

  addDropItem(i, event: MatChipInputEvent): void {
    // // console.log(event);
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.data['sentencesList'][i]['dropSamples'].push({id: null, text: value.trim(), answer: null});
      this.checkValidation();
    }

    if (this.data['sentencesList'][i]['dropSamples'].length === 1) {
      this.data['sentencesList'][i]['dropSamples'][0]['answer'] = true;
    }

    if (input) {
      input.value = '';
    }
  }

  checkValidation() {
    for (let i = 0; i < this.data['sentencesList'].length; i++) {
      if (this.data['sentencesList'][i]['dropSamples'].length === 0) {
        this.data['validationStatus'] = 'invalid';
        return;
      }
    }
    this.data['validationStatus'] = 'valid';
  }

  setAnswer(i, val) {
    this.data['sentencesList'][i]['dropSamples'].forEach((item, index) => {
      item.answer = val === item['text'];
    });
  }

  removeDropItem(i, item) {
    const index = this.data['sentencesList'][i]['dropSamples'].indexOf(item);
    const id = this.data['sentencesList'][i]['dropSamples'][index]['id'];
    if (index >= 0) {
      if (id) {
        this.lessonService.deleteAnswerById(id,
          (data) => {
            this.data['sentencesList'][i]['dropSamples'].splice(index, 1);
            this.checkValidation();
          },
          (error) => {
            // console.log(error);
          }
        );
      } else {
        this.data['sentencesList'][i]['dropSamples'].splice(index, 1);
        this.checkValidation();
      }
    }
  }

  public removeExercise() {
    this.onRemoveExercise.emit();
  }
}
