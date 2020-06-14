import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'in-delete-lesson-dialog',
  templateUrl: './delete-lesson-dialog.component.html',
  styleUrls: ['./delete-lesson-dialog.component.scss']
})
export class DeleteLessonDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
  }

  ngOnInit() {
  }
}
