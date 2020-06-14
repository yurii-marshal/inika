import {Component, Input, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {trigger, state, style} from '@angular/animations';
import {MatSelect, MatDialog} from '@angular/material';
import {DeleteTeacherDialogComponent} from '../delete-teacher-dialog/delete-teacher-dialog.component';
import {TeacherApiService} from '../../../services/api/teacher-api.service';
import {StudentApiService} from '../../../services/api/student-api.service';

@Component({
  selector: 'in-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  public userData: { userAvatarUrl: string; username: string; courseLevel: string; teacher: string };
  public isNewStudent: boolean;
  public isEditMode: boolean;
  public selectedTabIndex: any;
  private initFormTeacher: any;

  @ViewChild('coursesField') coursesField: MatSelect;
  @ViewChild('studentsField') studentsField: MatSelect;
  @ViewChild('autocomplete') autocomplete;

  @Input()
  formTeacher: Object = {
    country: '',
    profession: '',
    studentEmail: '',
    skype: '',
    phone: '',
    userName: ''
  };
  courseFormControl = new FormControl();
  studentFormControl = new FormControl();

  coursesList = [
    'Pre-Intermediate',
    'Intermediate',
    'Uper-Intermediate',
    'Advanced',
    'Beginer',
    'Pre-Intermediate',
    'Intermediate',
    'Uper-Intermediate',
    'Advanced',
    'Beginer',
    'Pre-Intermediate',
    'Intermediate',
    'Uper-Intermediate',
    'Advanced',
    'Beginer'
  ];

  students: any[];
  filteredStudentsMultiple: any[];
  studentsList: any[];

  calendarOptions: Object = {
    height: 'parent',
    fixedWeekCount: false,
    defaultDate: '2016-09-12',
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: [
      {
        title: 'All Day Event',
        start: '2016-09-01'
      },
      {
        title: 'Long Event',
        start: '2016-09-07',
        end: '2016-09-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2016-09-11',
        end: '2016-09-13'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T10:30:00',
        end: '2016-09-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2016-09-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2016-09-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2016-09-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2016-09-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2016-09-28'
      }
    ]
  };

  selectedCourses: any;

  courses = [
    {name: 'Pre-Intermediate'},
    {name: 'Intermediate'},
    {name: 'Uper-Intermediate'},
    {name: 'Advanced'},
    {name: 'Beginer'}
  ];

  // text: string;
  // results: string[];

  constructor(private activeRouter: ActivatedRoute,
              private router: Router,
              private deleteTeacherDialog: MatDialog,
              public teacherService: TeacherApiService,
              private studentsService: StudentApiService) {
    // console.log(this.activeRouter.snapshot.paramMap.get('id'));
    // console.log(this.selectedTabIndex);
    this.isEditMode = this.teacherService.isTeacherEditMode;
  }

  ngOnInit() {
    this.selectedTabIndex = this.teacherService.isTeacherEditMode ? 1 : 0;
    this.userData = {
      userAvatarUrl: '../../../assets/images/user.png',
      username: 'Alina Kozerod',
      courseLevel: 'Upper-Intermediate Course',
      teacher: 'Оксана Кулинич'
    };
    this.formTeacher = {
      country: 'Львов, Украина',
      profession: 'Бухгалтер',
      studentEmail: 'aliconnors@example.com',
      skype: 'alina_kozerod',
      phone: '+38 (099) 123 23 45',
      userName: ''
    };
    this.initFormTeacher = {...this.formTeacher};
    // this.studentsList = [...this.studentsService.getStudentsListTest()];
    // console.log('studentsList');
    // console.log(this.studentsList);
  }

  // search(event) {
  // 	this.studentsService.getStudentsListTest();
  // }

  ngAfterViewInit() {
    // console.log('autocomplete ngAfterViewInit:');
    // console.log(this.autocomplete);
    this.autocomplete.value = [];
    setTimeout(() => {
      this.autocomplete.value.push({name: 'Петрык Пяточкин'});
    }, 10000);
  }

  // this.filteredStudentsMultiple = [];
  // this.filteredStudentsMultiple.push({ name: 'Петрык Пяточкин' })

  ngOnDestroy() {
  }

  onFileSelected = (event) => {
    if (event.target.files && event.target.files[0]) {
      const obj = new FileReader();
      obj.onload = (data: any) => {
        this.userData.userAvatarUrl = data.target.result;
      };
      obj.readAsDataURL(event.target.files[0]);
    }
  };

  public getChangedDate() {
  }

  public saveTeacherInfo() {
    this.isEditMode = false;
    if (this.coursesField.triggerValue !== '') {
      this.userData.courseLevel = this.coursesField.triggerValue;
    }
    if (this.studentsField.triggerValue !== '') {
      this.userData.teacher = this.studentsField.triggerValue;
    }
    // // console.log(this.coursesSelected);
  }

  public deleteTeacher = () => {
    const dialogRef = this.deleteTeacherDialog.open(DeleteTeacherDialogComponent, {
      data: {
        name: 'Шевченко Марина'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result) {
        this.router.navigate(['/dashboard/teachers']);
      }
    });
  };

  public cancelEdit() {
    this.isEditMode = false;
    this.formTeacher = this.initFormTeacher;
  }

  public onPhoneInput = (event: any) => {
    const pattern = /^[0-9()\-+]*$/;
    if (event.key !== 'Backspace' && event.key !== 'Delete') {
      if (
        event.target.value.length > 50 ||
        !pattern.test(String.fromCharCode(event.charCode)) ||
        (event.key === ' ' && event.target.value[event.target.value.length - 1] === ' ')
      ) {
        event.preventDefault();
      }
    }
  };

  filterStudentMultiple(event) {
    // console.log('event.query:');
    // console.log(event.query);
    // console.log('filteredStudentsMultiple: ');
    // console.log(this.filteredStudentsMultiple);

    const query = event.query;
    this.filteredStudentsMultiple = this.filterStudent(query, this.studentsList);
    // console.log('filteredStudentsMultipleAfter: ');
    // console.log(this.filteredStudentsMultiple);
    // console.log('autocomplete:');
    // console.log(this.autocomplete);
  }

  filterStudent(query, students: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    // console.log('students: ');
    // console.log(students);

    const filtered: any[] = [];
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      if (student.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(student);
      }
    }
    // console.log('filtered: ');
    // console.log(filtered);

    return filtered;
  }
}
