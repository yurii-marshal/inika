import {Component, Inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EventCalendarService} from '../../services/eventCalendar.service';

@Component({
  selector: 'in-calendar-create-event-dialog',
  templateUrl: './calendar-create-event-dialog.component.html',
  styleUrls: ['./calendar-create-event-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarCreateEventDialogComponent implements OnInit {
  public days = [];
  public dateRange;
  public isEveryDay = false;
  public owlDateRange = [];
  public owlTimeRange = [];

  public isFormUnfilled = true;

  constructor(public dialogRef: MatDialogRef<CalendarCreateEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              public calendarService: EventCalendarService) {
    // console.log(this.data);
  }

  ngOnInit() {
    // this.owlDateRange[0] = this.data.eventname.date.utc();
    this.days = [
      {
        label: 'Пн',
        value: false
      },
      {
        label: 'Вт',
        value: false
      },
      {
        label: 'Ср',
        value: false
      },
      {
        label: 'Чт',
        value: false
      },
      {
        label: 'Пт',
        value: false
      },
      {
        label: 'Сб',
        value: false
      },
      {
        label: 'Вс',
        value: false
      }
    ];
    this.dateRange = {
      teacher_id: null,
      student_id: null,
      date_from: '',
      date_to: '',
      time_from: '',
      time_to: '',
      days: []
    };
    if (this.data['teachers_list']) {
      this.dateRange.teacher_id = this.data['teachers_list'][0]['id'];
    }
    this.owlTimeRange = [new Date(2018, 1, 1, 10, 0), new Date(2018, 1, 1, 11, 0)];
  }

  onEveryDayTrigger() {
    this.isEveryDay = !this.isEveryDay;
    this.days.forEach((item) => {
      item.value = this.isEveryDay;
    });
    this.checkOnEmptyFields();
  }

  onSave() {
    this.days.forEach((item, index) => {
      if (item.value === true) {
        if (index === 6) {
          this.dateRange.days.push(0);
        } else {
          this.dateRange.days.push(index + 1);
        }
      }
    });
    this.dateRange['time_from'] = this.owlTimeRange[0].toLocaleTimeString();
    this.dateRange['time_to'] = this.owlTimeRange[1].toLocaleTimeString();
    const format = this.dateRange['time_from'].match(/\s(.*)$/);
    if (format) {
      if (format[1] === 'AM' || format[1] === 'PM') {
        this.dateRange['time_from'] = this.calendarService.convertTimeAMto24(this.dateRange['time_from']);
        this.dateRange['time_to'] = this.calendarService.convertTimeAMto24(this.dateRange['time_to']);
      }
    }
    this.dateRange['date_from'] = this.owlDateRange[0];
    this.dateRange['date_to'] = this.owlDateRange[1];
    // console.log(this.owlTimeRange);
  }

  public checkOnEmptyFields() {
    if (this.data.teachers_list) {
      this.isFormUnfilled = this.owlDateRange.length < 1 || this.owlTimeRange.length < 1 || this.dateRange['teacher_id'] === null;
    }
    if (this.data.students_list) {
      this.isFormUnfilled = this.owlDateRange.length < 1 || this.owlTimeRange.length < 1 || this.dateRange['student_id'] === null;
    }
  }

  private convertTimeAMto24(val) {
    let hours = Number(val.match(/^(\d+)/)[1]);
    const minutes = Number(val.match(/:(\d+)/)[1]);
    const AMPM = val.match(/\s(.*)$/)[1];
    if (AMPM === 'PM' && hours < 12) {
      hours = hours + 12;
    }
    if (AMPM === 'AM' && hours === 12) {
      hours = hours - 12;
    }
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) {
      sHours = '0' + sHours;
    }
    if (minutes < 10) {
      sMinutes = '0' + sMinutes;
    }
    return (sHours + ':' + sMinutes);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
