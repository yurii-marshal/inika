import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentApiService} from '../../../services/api/student-api.service';
import {FormControl} from '@angular/forms';
import {
  MatSelect,
  MatDialog
} from '@angular/material';
import {DeleteUserDialogComponent} from './delete-user-dialog/delete-user-dialog.component';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'in-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent
  implements OnInit, OnDestroy, AfterViewInit {
  public userData: {
    userAvatarUrl: string;
    username: string;
    courseLevel: string;
    teacher: string;
  };
  public isNewStudent: boolean;
  public isEditMode: boolean;
  public selectedTabIndex: any;
  private initFormStudent: any;

  @ViewChild('coursesField') coursesField: MatSelect;
  @ViewChild('teacherssField') teacherssField: MatSelect;

  @Input()
  formStudent: Object = {
    country: '',
    profession: '',
    studentEmail: '',
    skype: '',
    phone: '',
    userName: ''
  };
  courseFormControl = new FormControl();
  teacherFormControl = new FormControl();

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

  teachersList = [
    'Козерод Алина',
    'Шевченко Марина',
    'Шолудеко Анастасия',
    'Шевченко Марина',
    'Шолудеко Анастасия',
    'Шевченко Марина',
    'Шолудеко Анастасия',
    'Шевченко Марина',
    'Шолудеко Анастасия',
    'Шевченко Марина',
    'Шолудеко Анастасия',
    'Шевченко Марина',
    'Шолудеко Анастасия'
  ];

  constructor(private activeRouter: ActivatedRoute,
              private studentService: StudentApiService,
              private router: Router,
              private deleteUserDialog: MatDialog,
              public authService: AuthService) {
    // console.log(this.activeRouter.snapshot.paramMap.get('id'));
    // console.log(this.studentService.isStudentEditMode);
    // console.log(this.selectedTabIndex);
    this.isEditMode = this.studentService.isStudentEditMode;
  }

  ngOnInit() {
    this.isNewStudent = false;
    this.selectedTabIndex = this.studentService.isStudentEditMode ? 1 : 0;
    this.userData = {
      userAvatarUrl: '../../../assets/images/user.png',
      username: 'Alina Kozerod',
      courseLevel: 'Upper-Intermediate Course',
      teacher: 'Оксана Кулинич'
    };
    this.formStudent = {
      country: 'Львов, Украина',
      profession: 'Бухгалтер',
      studentEmail: 'aliconnors@example.com',
      skype: 'alina_kozerod',
      phone: '+38 (099) 123 23 45',
      userName: ''
    };
    this.initFormStudent = {...this.formStudent};
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.studentService.isStudentEditMode = false;
  }

  onFileSelected = event => {
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

  public saveStudentInfo() {
    this.isEditMode = false;
    this.studentService.updateStudent(
      this.formStudent,
      data => {
        // console.log(data);
      },
      error => {
        // console.log(error);
      }
    );
    if (this.coursesField.triggerValue !== '') {
      this.userData.courseLevel = this.coursesField.triggerValue;
    }
    if (this.teacherssField.triggerValue !== '') {
      this.userData.teacher = this.teacherssField.triggerValue;
    }
    // // console.log(this.coursesSelected);
  }

  public deleteStudent = () => {
    this.studentService.deleteStudent(
      this.formStudent,
      data => {
        // console.log(data);
      },
      error => {
        // console.log(error);
      }
    );
    const dialogRef = this.deleteUserDialog.open(DeleteUserDialogComponent, {
      data: {
        name: this.userData.username
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result) {
        this.router.navigate(['/dashboard/students']);
      }
    });

    // this.router.navigate([ '/dashboard/students' ]);
  };

  public cancelEdit() {
    this.isEditMode = false;
    this.formStudent = this.initFormStudent;
  }

  public onPhoneInput = (event: any) => {
    const pattern = /^[0-9()\-+]*$/;
    if (event.key !== 'Backspace' && event.key !== 'Delete') {
      if (
        event.target.value.length > 50 ||
        !pattern.test(String.fromCharCode(event.charCode)) ||
        (event.key === ' ' &&
          event.target.value[event.target.value.length - 1] === ' ')
      ) {
        event.preventDefault();
      }
    }
  };
}
