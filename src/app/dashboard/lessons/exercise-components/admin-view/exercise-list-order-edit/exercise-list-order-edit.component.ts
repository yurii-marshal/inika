import {Component, EventEmitter, Input, OnInit, Output, ViewChildren} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'in-exercise-list-order-edit',
  templateUrl: './exercise-list-order-edit.component.html',
  styleUrls: ['./../exercise-answers-list-edit/exercise-answers-list-edit.component.scss']
})
export class ExerciseListOrderEditComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;

  public data;
  @ViewChildren('newWord') newWord;
  @Output() onRemoveExercise: EventEmitter<any> = new EventEmitter();

  constructor(public lessonService: LessonsApiService,
              private dragulaService: DragulaService) {
  }

  ngOnInit() {
    this.data = this.lessonService.lessonEntity[this.type][this.index]['data'];
    this.data['sentencesList'].forEach((item) => {
      const testLength = item['dropTestSamples'].length;
      let answerLength = item['dropAnswerSamples'].length;
      while (testLength > answerLength) {
        item['dropAnswerSamples'].push('');
        answerLength++;
      }
    });
    this.dragulaService.drop.subscribe(value => {
      const [bagName, e, el] = value;
    });
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

  public onEnterInputWord(ev, i) {
    if ((ev.which === 13 || ev.keyCode === 13)) {
      ev.preventDefault();
      this.createDragItem(i);
    }
  }

  addSentence() {
    this.data['sentencesList'].push({
      id: null,
      dropTestSamples: [],
      dropAnswerSamples: []
    });
    this.data['validationStatus'] = 'invalid';
  }

  onItemDrop(e, i, k) {
    if (!this.data['sentencesList'][i]['dropAnswerSamples'][k]) {
      this.data['sentencesList'][i]['dropAnswerSamples'][k] = e.dragData;
      this.checkValidation();
    }
  }

  createDragItem(i) {
    if (this.data['sentencesList'][i].sampleItem !== '') {
      const testSample = {
        value: this.data['sentencesList'][i].sampleItem,
        id: this.lessonService.generateRandomId(this.data['sentencesList'][i].dropTestSamples.map(function (a) {
          return a.id;
        }))
      };
      this.data['sentencesList'][i].dropTestSamples.push(testSample);
      this.data['sentencesList'][i].dropAnswerSamples.push('');
      this.data['sentencesList'][i].sampleItem = '';
      // this.data['sentencesList'][i].id = null;
    }
    this.data['validationStatus'] = 'invalid';
  }

  removeDragItem(i, j) {
    const dropItem = this.data['sentencesList'][i].dropTestSamples[j];
    if (typeof(dropItem.id) === 'number') {
      this.checkAndRemove(i, j);
    } else {
      this.lessonService.deleteAnswerById(this.data['sentencesList'][i].dropTestSamples[j].id,
        (data) => {
          this.checkAndRemove(i, j);
        },
        (error) => {
          // console.log(error);
        }
      );
    }
  }

  checkAndRemove(i, j) {
    let t = false;
    // remove if answerSample is filled by dragItem
    for (let k = 0; k < this.data['sentencesList'][i].dropAnswerSamples.length; k++) {
      if (this.data['sentencesList'][i].dropAnswerSamples[k].id === this.data['sentencesList'][i].dropTestSamples[j].id) {
        this.data['sentencesList'][i].dropAnswerSamples.splice(k, 1);
        t = true;
        break;
      }
    }
    if (!t) {
      for (let k = this.data['sentencesList'][i].dropAnswerSamples.length - 1; k >= 0; k--) {
        if (this.data['sentencesList'][i].dropAnswerSamples[k] === '') {
          this.data['sentencesList'][i].dropAnswerSamples.splice(k, 1);
          break;
        }
      }
    }
    this.data['sentencesList'][i].dropTestSamples.splice(j, 1);
  }

  removeDropItem(i, k) {
    const index = this.data['sentencesList'][i]['dropTestSamples'].findIndex(x => x.id === this.data['sentencesList'][i]['dropAnswerSamples'][k].id);
    if (index === -1) {
      this.data['sentencesList'][i]['dropTestSamples'].push(this.data['sentencesList'][i]['dropAnswerSamples'][k]);
    }
    this.data['sentencesList'][i]['dropAnswerSamples'][k] = '';
    this.data['validationStatus'] = 'invalid';
  }

  checkValidation() {
    for (let i = 0; i < this.data['sentencesList'].length; i++) {
      for (let j = 0; j < this.data['sentencesList'][i]['dropAnswerSamples'].length; j++) {
        // console.log(this.data['sentencesList'][i]['dropAnswerSamples'][j]);
        if (this.data['sentencesList'][i]['dropAnswerSamples'][j] === '') {
          this.data['validationStatus'] = 'invalid';
          return;
        }
      }
    }
    this.data['validationStatus'] = 'valid';
  }

  public removeExercise() {
    this.onRemoveExercise.emit();
  }
}
