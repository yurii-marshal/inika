import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FileItem, FileUploader} from 'ng2-file-upload';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-audio-edit',
  templateUrl: './exercise-audio-edit.component.html',
  styleUrls: ['./exercise-audio-edit.component.scss']
})
export class ExerciseAudioEditComponent implements OnInit, AfterViewInit {
  @Input() index: any;
  @Input() type: any;
  public data;
  public queue;
  @Output() onRemoveExercise: EventEmitter<any> = new EventEmitter();
  @Output() onCompleteItem = new EventEmitter();
  @ViewChild('fileInput') fileInput;

  public uploader = new FileUploader({});
  public exerciseHeader: string;
  @ViewChild('audioOption') audioPlayerRef: ElementRef;
  @ViewChild('player') player: ElementRef;

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.data = this.lessonService.lessonEntity[this.type][this.index]['data'];
  }

  onFileSelected(ev) {
    if (this.data['sentencesList'].length > 0) {
      this.removeAudioFile();
      const date: number = new Date().getTime();
      const file = new File(ev, ev[0].name, {type: 'text/plain', lastModified: date});
      const fileItem = new FileItem(this.uploader, file, {});
      this.uploader.queue.push(fileItem);
    }
    this.lessonService.checkAndDeleteMediaDataItems(this.type, this.index);
    const media_id = this.lessonService.generateRandomId(this.lessonService.exerciseMediaData[this.type].map(a => a.media_id));
    this.lessonService.exerciseMediaData[this.type].push({
      media_id: media_id,
      type_id: 2,
      s_index: this.index,
      file: ev[0],
      question_id: null
    });
    this.data['sentencesList'][0] = ({id: null, media_id: media_id, mediaData: ''});
  }

  removeQueueFile(i) {
    this.data['sentencesList'][i]['mediaData'] = '';
  }

  removeAudioFile() {
    this.uploader.clearQueue();
    const id = this.data['sentencesList'][0]['id'];
    if (id) {
      this.lessonService.deleteSentenceById(id,
        (data) => {
          this.lessonService.checkAndDeleteMediaDataItems(this.type, this.index);
          this.data['sentencesList'] = [];
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      this.lessonService.checkAndDeleteMediaDataItems(this.type, this.index);
      this.data['sentencesList'] = [];
    }
  }

  ngAfterViewInit() {
  }

  deleteSentence(i) {
    const id = this.data['sentencesList'][i]['id'];
    if (id) {
      this.lessonService.deleteSentenceById(id,
        (data) => {
          this.lessonService.checkAndDeleteMediaDataItems(this.type, this.index);
          this.data['sentencesList'].splice(i, 1);
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      this.lessonService.checkAndDeleteMediaDataItems(this.type, this.index);
      this.data['sentencesList'].splice(i, 1);
    }
  }

  public removeExercise() {
    this.onRemoveExercise.emit();
  }
}
