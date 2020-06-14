import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-reference-read',
  templateUrl: './exercise-reference-read.component.html',
  styleUrls: ['./exercise-reference-read.component.scss']
})
export class ExerciseReferenceReadComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;
  public exercise;

  constructor(private toastr: ToastrService,
              private lessonService: LessonsApiService) {
  }

  ngOnInit() {
    this.exercise = this.lessonService.lessonEntity[this.type][this.index];
  }
}
