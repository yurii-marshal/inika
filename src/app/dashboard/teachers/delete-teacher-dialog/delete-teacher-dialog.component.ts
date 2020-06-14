import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'in-delete-teacher-dialog',
  templateUrl: './delete-teacher-dialog.component.html',
  styleUrls: ['./delete-teacher-dialog.component.scss']
})
export class DeleteTeacherDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
    // console.log('%c DeleteTeacherDialogComponent passedData: ', 'background: #444; color: #01FF70');
    // console.log(passedData);
  }

  ngOnInit() {
  }
}
