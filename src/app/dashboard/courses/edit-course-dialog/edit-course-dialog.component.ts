import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'in-edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.scss']
})
export class EditCourseDialogComponent implements OnInit {

  courseName: any;

  constructor(
    public dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public passedData: any) {
  }

  ngOnInit() {
    // console.log('%c passedData ', 'background: #444; color: #01FF70');
    // console.log(this.passedData);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
