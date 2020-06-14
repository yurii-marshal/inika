import {Component, Input, OnInit} from '@angular/core';
import {Course} from './Course';

@Component({
  selector: 'in-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  @Input() public data: Course;

  constructor() {
  }

  ngOnInit() {
  }

}
