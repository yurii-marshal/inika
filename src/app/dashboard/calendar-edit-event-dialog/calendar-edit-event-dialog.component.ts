import {Component, Inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EventCalendarService} from '../../services/eventCalendar.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'in-calendar-edit-event-dialog',
  templateUrl: './calendar-edit-event-dialog.component.html',
  styleUrls: ['./../calendar-create-event-dialog/calendar-create-event-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEditEventDialogComponent implements OnInit {
  public dateRange = {
    id: null,
    teacher_id: null,
    student_id: null,
    date: '',
    time_from: '',
    time_to: '',
    status_id: ''
  };
  public isEveryDay = false;
  public owlDate: any;
  public owlTimeRange = [];
  public currentStatusId = null;

  public isFormUnfilled = true;

  constructor(public dialogRef: MatDialogRef<CalendarEditEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              public authService: AuthService,
              public ecService: EventCalendarService) {
    const ev = data['event'];
    this.owlDate = new Date(ev.start.format('YYYY-MM-DD'));
    const dat1 = new Date(),
      dat2 = new Date(),
      time1 = ev['time_from'].split(/\:|\-/g),
      time2 = ev['time_to'].split(/\:|\-/g);
    this.owlTimeRange = [
      new Date(dat1.setHours(time1[0], time1[1])),
      new Date(dat2.setHours(time2[0], time2[1]))
    ];
    this.dateRange['teacher_id'] = ev['teacher_id'];
    this.dateRange['student_id'] = ev['student_id'];
    this.dateRange['status_id'] = ev['status_id'];
    this.dateRange['id'] = ev['id'];
    this.currentStatusId = ev['status_id'];
    // console.log(this.owlTimeRange);
    // this.dateRange = ev;
    this.checkOnEmptyFields();
  }

  ngOnInit() {
  }

  onEveryDayTrigger() {
    this.isEveryDay = !this.isEveryDay;
    this.checkOnEmptyFields();
  }

  onSave() {
    this.dateRange['time_from'] = this.owlTimeRange[0].toLocaleTimeString();
    this.dateRange['time_to'] = this.owlTimeRange[1].toLocaleTimeString();
    const format = this.dateRange['time_from'].match(/\s(.*)$/);
    if (format) {
      if (format[1] === 'AM' || format[1] === 'PM') {
        this.dateRange['time_from'] = this.ecService.convertTimeAMto24(this.dateRange['time_from']);
        this.dateRange['time_to'] = this.ecService.convertTimeAMto24(this.dateRange['time_to']);
      }
    }
    this.dateRange['date'] = this.owlDate;
    this.dateRange['status_id'] = this.currentStatusId;
  }

  public checkOnEmptyFields() {
    this.isFormUnfilled = this.owlDate.length < 1 || this.owlTimeRange.length < 1;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
