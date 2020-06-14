import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileHolder, UploadMetadata} from 'angular2-image-upload';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-image-edit',
  templateUrl: './exercise-image-edit.component.html',
  styleUrls: ['./exercise-image-edit.component.scss']
})
export class ExerciseImageEditComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;
  public data;
  @Output() onRemoveExercise: EventEmitter<any> = new EventEmitter();
  extensions = ['jpeg', 'png'];
  public maxImgToLoad = 1;

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.data = this.lessonService.lessonEntity[this.type][this.index]['data'];
    this.maxImgToLoad -= this.data['sentencesList'].length;
    this.data['srcURLs'] = this.data['sentencesList'].map(a => a['mediaData']);
  }

  onRemoved(file: FileHolder) {
    // console.log(this.lessonService.exerciseMediaData[this.type]);
    this.data['sentencesList'].forEach((item, index) => {
      if (Number(item['media_id']) === Number(file['file']['media_id'])) {
        this.data['sentencesList'].splice(index, 1);
      }
    });
    this.lessonService.exerciseMediaData[this.type].forEach((item, index) => {
      if (Number(item['file']['media_id']) === Number(file['file']['media_id'])) {
        this.lessonService.exerciseMediaData[this.type].splice(index, 1);
      }
    });
  }

  deleteSentence(i) {
    const id = this.data['sentencesList'][i]['id'];
    if (id) {
      this.lessonService.deleteSentenceById(id,
        (data) => {
          this.lessonService.checkAndDeleteMediaDataItems(this.type, this.index);
          this.data['sentencesList'].splice(i, 1);
          this.maxImgToLoad++;
          // console.log(this.maxImgToLoad);
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      this.lessonService.checkAndDeleteMediaDataItems(this.type, this.index);
      this.data['sentencesList'].splice(i, 1);
      this.maxImgToLoad++;
      // console.log(this.maxImgToLoad);
    }
  }

  onUploadFinished(ev) {
    // console.log(this.maxImgToLoad, ev);
    const media_id = this.lessonService.generateRandomId(this.lessonService.exerciseMediaData[this.type].map(a => a.media_id));
    ev['file']['media_id'] = media_id;
    this.lessonService.exerciseMediaData[this.type].push({
      media_id: media_id,
      type_id: 1,
      s_index: this.index,
      file: ev['file'],
      question_id: null
    });
    this.data['sentencesList'].push({id: null, media_id: media_id, mediaData: ''});
    // // console.log(this.data['sentencesList'].length);
  }

  onUploadStateChanged(ev) {
    // console.log(ev);
  }

  public removeExercise() {
    this.onRemoveExercise.emit();
  }

  public onBeforeUpload(metadata: UploadMetadata) {
    // console.log(metadata);
    metadata.abort = false;
    return metadata;
  };
}
