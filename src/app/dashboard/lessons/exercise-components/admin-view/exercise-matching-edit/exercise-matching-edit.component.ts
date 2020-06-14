import {Component, EventEmitter, Input, OnInit, Output, ViewChildren} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-matching-edit',
  templateUrl: './exercise-matching-edit.component.html',
  styleUrls: ['./exercise-matching-edit.component.scss']
})
export class ExerciseMatchingEditComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;

  public data;
  @ViewChildren('newWord') newWord;
  @Output() onRemoveExercise: EventEmitter<any> = new EventEmitter();
  public uploadedFiles = [];
  url: string;
  extensions = ['jpeg', 'png'];
  public sampleItem: string;

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.data = this.lessonService.lessonEntity[this.type][this.index]['data'];
  }

  onRemoved(ev, i) {
    this.data['sentencesList'][i].mediaData = null;
  }

  onUploadFinished(ev, i) {
    const media_id = this.lessonService.generateRandomId(this.lessonService.exerciseMediaData[this.type].map(a => a.media_id));
    this.lessonService.exerciseMediaData[this.type].push({
      media_id: media_id,
      type_id: 1,
      s_index: this.index,
      file: ev['file'],
      question_id: null
    });
    this.data['sentencesList'][i].mediaData = ev.src;
    this.data['sentencesList'][i].media_id = media_id;
    this.data['sentencesList'][i].exerciseImage = '';
    this.checkValidation();
  }

  onUploadStateChanged(ev, i) {
    // console.log(ev);
  }

  addMatching() {
    this.data['sentencesList'].push({
      id: null,
      mediaData: '',
      dropSample: '',
      answerSample: '',
      isError: false,
      isSuccess: false
    });
    this.data['validationStatus'] = 'invalid';
  }

  deleteSentence(index) {
    const id = this.data['sentencesList'][index]['id'];
    if (id) {
      this.lessonService.deleteSentenceById(id,
        (data) => {
          this.lessonService.checkAndDeleteMediaDataItems(this.type, this.index);
          this.data['sentencesList'].splice(index, 1);
          this.checkValidation();
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      this.lessonService.checkAndDeleteMediaDataItems(this.type, this.index);
      this.data['sentencesList'].splice(index, 1);
      this.checkValidation();
    }
  }

  onItemDrop(e: any, i) {
    this.data['sentencesList'][i]['dropSample'] = e.dragData;
    this.checkValidation();
  }

  removeDropItem(i) {
    const id = this.data['sentencesList'][i]['answerId'];
    if (id) {
      this.lessonService.deleteAnswerById(id,
        (data) => {
          const index = this.data['dragItems'].findIndex(x => x === this.data['sentencesList'][i]['dropSample']);
          if (index === -1) {
            this.data['dragItems'].push(this.data['sentencesList'][i]['dropSample']);
          }
          delete this.data['sentencesList'][i]['dropSample'];
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      const index = this.data['dragItems'].findIndex(x => x === this.data['sentencesList'][i]['dropSample']);
      if (index === -1) {
        this.data['dragItems'].push(this.data['sentencesList'][i]['dropSample']);
      }
      delete this.data['sentencesList'][i]['dropSample'];
      this.data['validationStatus'] = 'invalid';
    }
  }

  public removeExercise() {
    this.onRemoveExercise.emit();
  }

  public onEnterInputWord(ev) {
    if ((ev.which === 13 || ev.keyCode === 13)) {
      ev.preventDefault();
      this.createDragItem();
    }
  }

  createDragItem() {
    this.data['dragItems'].push(this.sampleItem);
    this.sampleItem = '';
  }

  removeDragItem(i) {
    let id = null;
    this.data['sentencesList'].forEach((item) => {
      if (item['dropSample'] === this.data['dragItems'][i]) {
        id = item['answerId'];
      }
    });
    if (id) {
      this.lessonService.deleteAnswerById(id,
        (data) => {
          this.onDragItemDelete(i);
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      this.onDragItemDelete(i);
    }
  }

  private onDragItemDelete(i) {
    this.data['sentencesList'].forEach((item) => {
      if (item.dropSample === this.data['dragItems'][i]) {
        delete item.dropSample;
      }
    });
    this.data['dragItems'].splice(i, 1);
  }

  checkValidation() {
    for (let i = 0; i < this.data['sentencesList'].length; i++) {
      if (!this.data['sentencesList'][i]['dropSample'] ||
        !this.data['sentencesList'][i]['mediaData']) {
        this.data['validationStatus'] = 'invalid';
        return;
      }
    }
    this.data['validationStatus'] = 'valid';
  }
}
