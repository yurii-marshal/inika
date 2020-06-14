import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer} from '@angular/platform-browser';
import {LessonsApiService} from '../../../../../services/api/lessons-api.service';

@Component({
  selector: 'in-exercise-reference-edit',
  templateUrl: './exercise-reference-edit.component.html',
  styleUrls: ['./exercise-reference-edit.component.scss']
})
export class ExerciseReferenceEditComponent implements OnInit {
  @Input() index: any;
  @Input() type: any;
  public data;
  @Output() onRemoveExercise: EventEmitter<any> = new EventEmitter();
  public sanitizedRef;

  constructor(private toastr: ToastrService,
              private lessonService: LessonsApiService,
              private sanitized: DomSanitizer) {
  }

  ngOnInit() {
    this.data = this.lessonService.lessonEntity[this.type][this.index]['data'];
  }

  setRefSanitized() {
    this.sanitizedRef = this.sanitized.bypassSecurityTrustResourceUrl(this.data['refStr']);
  }

  public removeExercise() {
    this.onRemoveExercise.emit();
  }
}
