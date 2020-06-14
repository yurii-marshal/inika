import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  lessonName: string;
  keywords: string[];
}

@Component({
  selector: 'in-create-lesson-dialog',
  templateUrl: './create-lesson-dialog.component.html',
  styleUrls: ['./create-lesson-dialog.component.scss']
})
export class CreateLessonDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CreateLessonDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onCancel() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
