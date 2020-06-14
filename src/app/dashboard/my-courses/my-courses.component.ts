import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'in-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  courseCardBgUrl = '../../../assets/images/course-1.jpg';

  constructor() { }

  ngOnInit() {
  }

}
