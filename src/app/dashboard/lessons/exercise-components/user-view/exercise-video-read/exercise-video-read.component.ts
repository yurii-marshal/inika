import {Component, Input, OnInit} from '@angular/core';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-video-read',
  templateUrl: './exercise-video-read.component.html',
  styleUrls: ['./exercise-video-read.component.scss']
})
export class ExerciseVideoReadComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;
  public exercise;
  public isErrorRef: boolean;

  private regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

  public id: string;

  private player;
  private ytEvent;

  constructor(public lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.exercise = this.lessonService.lessonEntity[this.type][this.index];
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
    if (this.exercise['data']['refStr']) {
      if (this.exercise['data']['refStr'].match(this.regExp) !== null) {
        this.isErrorRef = false;
        this.id = this.exercise['data']['refStr'].match(this.regExp)[1];
      } else {
        this.id = this.exercise['data']['refStr'];
        this.isErrorRef = true;
      }
    }
  }
}
