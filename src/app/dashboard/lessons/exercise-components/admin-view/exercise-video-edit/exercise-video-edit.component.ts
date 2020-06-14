import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-video-edit',
  templateUrl: './exercise-video-edit.component.html',
  styleUrls: ['./exercise-video-edit.component.scss']
})
export class ExerciseVideoEditComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;
  public data;
  @Output() onRemoveExercise: EventEmitter<any> = new EventEmitter();
  public isErrorRef: boolean;

  private regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

  public id: string;

  private player;
  private ytEvent;

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.data = this.lessonService.lessonEntity[this.type][this.index]['data'];
    this.id = '';
    this.getYouTubeRef();
  }

  onStateChange(event) {
    this.ytEvent = event.data;
  }

  savePlayer(player) {
    this.player = player;
  }

  getYouTubeRef() {
    if (this.data['refStr']) {
      if (this.data['refStr'].match(this.regExp) !== null) {
        this.isErrorRef = false;
        this.id = this.data['refStr'].match(this.regExp)[1];
      } else {
        this.id = this.data['refStr'];
        this.isErrorRef = true;
      }
    }
  }

  public removeExercise() {
    this.onRemoveExercise.emit();
  }
}
