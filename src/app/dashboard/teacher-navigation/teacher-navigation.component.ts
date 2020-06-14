import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'in-teacher-navigation',
  templateUrl: './teacher-navigation.component.html',
  styleUrls: ['./teacher-navigation.component.scss']
})
export class TeacherNavigationComponent implements OnInit {
  studentAvatarUrl = '../../../assets/images/testimonial1.jpg';

  constructor() { }

  ngOnInit() {
  }

}
