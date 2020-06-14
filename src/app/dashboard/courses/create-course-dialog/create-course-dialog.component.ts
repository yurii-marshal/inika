import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  courseName: string;
}

@Component({
  selector: 'in-create-course-dialog',
  templateUrl: './create-course-dialog.component.html',
  styleUrls: ['./create-course-dialog.component.scss']
})
export class CreateCourseDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  ngOnInit() {
  }
}
