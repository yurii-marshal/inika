import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'in-delete-course-dialog',
  templateUrl: './delete-course-dialog.component.html',
  styleUrls: ['./delete-course-dialog.component.scss']
})
export class DeleteCourseDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
  }

  ngOnInit() {
  }
}
