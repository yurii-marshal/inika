import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'in-teacher-lesson-details-table',
  templateUrl: './teacher-lesson-details-table.component.html',
  styleUrls: ['./teacher-lesson-details-table.component.scss']
})
export class TeacherLessonDetailsTableComponent implements OnInit {

  displayedColumns: string[] = ['student', 'date', 'time', 'dayOfTheWeek', 'status' ];
  dataSource = new MatTableDataSource<DataElement>(DATA);

  constructor() { }

  ngOnInit() {
  }
}

export interface DataElement {
      student: string;
      date: string;
      dayOfTheWeek: number;
      time: string;
      status: string;
  }

  const DATA: DataElement[] = [
    { student: 'Mike', date: '101118', time: '12:00', dayOfTheWeek: 3, status: 'Проведен' },
    { student: 'Pike', date: '101318', time: '13:00', dayOfTheWeek: 3, status: 'Отменен' },
    { student: 'Bike', date: '101218', time: '14:00', dayOfTheWeek: 3, status: 'Запланирован' }
  ];
