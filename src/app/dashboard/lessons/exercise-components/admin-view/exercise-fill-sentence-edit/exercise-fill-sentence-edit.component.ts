import {Component, EventEmitter, Input, OnInit, Output, ViewChildren} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-fill-sentence-edit',
  templateUrl: './exercise-fill-sentence-edit.component.html',
  styleUrls: ['./exercise-fill-sentence-edit.component.scss']
})
export class ExerciseFillSentenceEditComponent implements OnInit {
  @ViewChildren('newWord') newWord;
  @Input() index: any;
  @Input() type: any;

  public data;
  @Output() onRemoveExercise: EventEmitter<any> = new EventEmitter();

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.data = this.lessonService.lessonEntity[this.type][this.index]['data'];
    this.checkValidation();
  }

  public onEnterInputWord(ev) {
    if ((ev.which === 13 || ev.keyCode === 13)) {
      ev.preventDefault();
      this.createDragItem();
    }
  }

  onItemDrop(e: any, i) {
    // console.log(this.data['sentencesList'][i]);
    if (!this.data['sentencesList'][i]['dropSample']['value']) {
      this.data['dragItems'].forEach((item, index) => {
        if (item.value === e.dragData.value) {
          this.data['sentencesList'][i]['dropSample'] = this.data['dragItems'][index];
          this.checkValidation();
          // this.data['dragItems'].splice(index, 1);
        }
      });
    }
  }

  removeDragItem(i) {
    this.data['dragItems'].splice(i, 1);
  }

  removeDropItem(i) {
    const id = this.data['sentencesList'][i]['answerId'];
    if (id) {
      this.lessonService.deleteAnswerById(id,
        (data) => {
          this.onRemoveAnswerItem(i);
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      this.onRemoveAnswerItem(i);
    }
  }

  private onRemoveAnswerItem(i) {
    for (let index = 0; index < this.data['dragItems'].length; index++) {
      if (this.data['dragItems'][index]['value'] === this.data['sentencesList'][i]['dropSample']['value']) {
        this.data['dragItems'].splice(index, 1);
        break;
      }
    }
    if (this.data['sentencesList'][i]['dropSample']['value'] !== '') {
      this.data['dragItems'].push(this.data['sentencesList'][i]['dropSample']);
      this.data['sentencesList'][i]['dropSample'] = {};
      this.data['validationStatus'] = 'invalid';
    }
  }

  createDragItem() {
    if (this.data['sampleItem'] !== '') {
      this.data['dragItems'].push({
        value: this.data['sampleItem'],
        id: this.lessonService.generateRandomId(this.data['dragItems'].map(function (a) {
          return a.id;
        }))
      });
      this.data['sampleItem'] = '';
    }
  }

  addSentence() {
    this.data['sentencesList'].push({
      id: null,
      textSamples: ['', ''],
      dropSample: {}
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
    this.onRemoveAnswerItem(index);
    this.data['sentencesList'].splice(index, 1);
    this.checkValidation();
  }

  checkValidation() {
    for (let i = 0; i < this.data['sentencesList'].length; i++) {
      if (!this.data['sentencesList'][i]['dropSample'].value ||
        (this.data['sentencesList'][i]['textSamples'][0] === '' &&
        this.data['sentencesList'][i]['textSamples'][1] === '')
      ) {
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
