import {Component, OnInit, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TeacherApiService} from '../../../services/api/teacher-api.service';
import {Student} from '../student.model';
import {Subscription} from 'rxjs/Subscription';
import {MatDialog} from '@angular/material';
import {DeleteUserDialogComponent} from '../student-profile/delete-user-dialog/delete-user-dialog.component';
import {CalendarComponent} from 'ng-fullcalendar';
import {EventCalendarService} from '../../../services/eventCalendar.service';
import {CalendarCreateEventDialogComponent} from '../../calendar-create-event-dialog/calendar-create-event-dialog.component';
import {StudentApiService} from '../../../services/api/student-api.service';
import {CalendarEditEventDialogComponent} from '../../calendar-edit-event-dialog/calendar-edit-event-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'in-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentCreateComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('payedlessonscount') plc: any;
  form: FormGroup;
  selectedTabIndex: any;
  imagePreview: string;
  student: Student;
  isEditMode: boolean;
  private mode = 'create';
  private studentId: string;
  createUser = false;
  coursesList: any[];
  teachersList: any[];
  teachersListSub: Subscription;
  coursesListSub: Subscription;
  getTeacherSub: Subscription;
  // emailUsed = this.teacherService.isEmailUsed();
  lessonStatusId: number;
  emailUsed: any;

  payedLessonsCount = 0;
  payedLessonsCount_tmp = 0;

  events = [];

  isEditCount = false;

  @ViewChild('ucCalendar') ucCalendar: CalendarComponent;

  constructor(public teacherService: TeacherApiService,
              public authService: AuthService,
              private deleteStudentDialog: MatDialog,
              public route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              public studentService: StudentApiService,
              public eventCalendarService: EventCalendarService,
              private cdRef: ChangeDetectorRef,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.teacherService.getStudents({});
    this.createUser = this.teacherService.createUser;

    this.form = new FormGroup({
      teachersInputField: new FormControl({value: null, disabled: false}),
      coursesInputField: new FormControl({value: null, disabled: false}),
      username: new FormControl(
        {value: null, disabled: false},
        {
          validators: [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(1)
          ]
        }),
      address: new FormControl(
        {value: null, disabled: false},
        {
          validators: [
            Validators.maxLength(50)
          ]
        }
      ),
      activity: new FormControl(
        {value: null, disabled: false},
        {
          validators: [
            Validators.maxLength(50)
          ]
        }
      ),
      phone: new FormControl(
        {value: null, disabled: false},
        {
          validators: [
            Validators.maxLength(50)
          ]
        }
      ),
      skype: new FormControl(
        {value: null, disabled: false},
        {
          validators: [
            Validators.maxLength(50)
          ]
        }
      ),
      email: new FormControl(
        {value: null, disabled: false},
        {
          validators: [
            Validators.maxLength(50),
            Validators.email,
            Validators.required
          ]
        }
      ),
      avatar_img: new FormControl(
        {value: null},
        {})
    });
    this.disableForm();
    if (this.createUser) {
      this.enableForm();
    }
    this.initStudent();
  }

  ngAfterViewInit() {
    this.teacherService.getActiveCourses();
    this.coursesListSub = this.teacherService.getActiveCoursesUpdatedListener()
      .subscribe((responsData: any) => {
        // console.log(responsData);
        this.coursesList = responsData;
        // console.log(this.coursesList);
      });

    this.teacherService.getTeachers({});
    this.teachersListSub = this.teacherService.getTeachersUpdateListener()
      .subscribe((userData) => {
        // // console.log(userData);
        this.teachersList = userData.map((teacher) => {
          return {id: teacher.id, name: teacher.username};
        });
        // console.log(this.teachersList);
      });
    this.selectedTabIndex = this.teacherService.selectedTabIndex;

  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  initStudent() {
    this.emailUsed = false;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('studentId')) {
        this.mode = 'edit';
        this.studentId = paramMap.get('studentId');
        this.teacherService.getUser(this.studentId).subscribe(studentData => {
          // console.log(studentData);
          if (this.teacherService.editMode) {
            this.enableForm();
            this.teacherService.editMode = false;
          }

          this.student = studentData['data'].user;
          this.payedLessonsCount = studentData['data'].user['lesson_qnt'] || 0;
          this.payedLessonsCount_tmp = studentData['data'].user['lesson_qnt'] || 0;
          this.student['avatar_img'] = studentData['data'].user.avatar_url || this.imagePreview;

          this.form.patchValue({
            username: this.student.username,
            address: this.student.address || '',
            activity: this.student.activity || '',
            phone: this.student.phone || '',
            skype: this.student.skype || '',
            email: this.student.email,
            avatar_img: this.student.avatar_img,
            coursesInputField: this.student.courses ? this.student.courses.map(student => {
              return parseInt(student.id, 10);
            }) : null,
            teachersInputField: this.student.teachers ? this.student.teachers.map(student => {
              return parseInt(student.id, 10);
            }) : null
          });
          this.imagePreview = studentData['data'].user.avatar_url;

          if (!this.imagePreview) {
            this.imagePreview = this.teacherService.defaultImage;
          }
        });
        this.getEventsList();
      } else {
        this.enableForm();
        this.mode = 'create';
        this.studentId = null;
        this.imagePreview = this.teacherService.defaultImage;
      }
    });
  }

  cancelEdit() {
    if (this.studentId === null) {
      this.router.navigate(['/dashboard/students']);
    }
    this.teacherService.createUser = false;
    this.initStudent();
    this.disableForm();
  }

  onSaveStudent() {
    if (this.form.invalid) {
      return;
    }

    let student: any;

    if (this.mode === 'create') {
      // student = {...this.form.value};
      // student['role_id'] = 3;
      student = {
        username: this.form.value.username,
        address: this.form.value.address,
        activity: this.form.value.activity,
        phone: this.form.value.phone,
        skype: this.form.value.skype,
        email: this.form.value.email,
        file: this.form.value.avatar_img || null,
        teachers: this.form.value.teachersInputField || [],
        courses: this.form.value.coursesInputField || [],
        role_id: '3'
      };
      // console.log(student);
      this.teacherService.createNewUser(student, () => {
        this.disableForm();
        this.emailUsed = false;
        this.toastr.success('Профиль студента успешно создан', student['username']);
      }, (err) => {
        this.emailUsed = err;
      });
      // this.emailUsed = this.teacherService.emailUsed;
      // if (this.emailUsed === false) {
      // 	this.disableForm();
      // }
      // this.form.reset();

    } else {
      // console.log(this.form.value.coursesInputField);
      // console.log(this.form.value.teachersInputField);

      student = {
        id: this.student.id,
        username: this.form.value.username,
        address: this.form.value.address || '',
        activity: this.form.value.activity || '',
        phone: this.form.value.phone || '',
        skype: this.form.value.skype || '',
        email: this.form.value.email || '',
        file: this.form.value.avatar_img || 'noImage',
        courses: this.form.value.coursesInputField || [],
        teachers: this.form.value.teachersInputField || [],
        students: this.form.value.studentsInputField || [],
        role_id: '3'
      };
      // console.log(student);

      this.teacherService.updateUser(student, () => {
        this.disableForm();
        this.emailUsed = false;
        this.toastr.success('Профиль студента успешно обновлен', student['username']);
      }, (err) => {
        this.emailUsed = err;
      });
      setTimeout(() => {
        this.getTeacherSub = this.teacherService.getUser(this.studentId)
          .subscribe((resp) => {
            this.student.teachers = resp['data'].user.teachers;
            this.student.courses = resp['data'].user.courses;
          });
      }, 100);

      // this.disableForm();
    }
  }

  ngOnDestroy() {
    this.teachersListSub.unsubscribe();
    this.coursesListSub.unsubscribe();
    if (this.getTeacherSub) {
      this.getTeacherSub.unsubscribe();
    }
    this.teacherService.createUser = false;
    this.eventCalendarService.calendarOptions.events = [];
  }

  onImagePicked = (event: Event) => {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({avatar_img: file});
    this.form.get('avatar_img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);

    // console.log(file);
    // console.log(this.form);
  };

  onPhoneInput = (event: any) => {
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

  onDayClick(ev, self) {
    // // console.log(self.payedLessonsCount > 0, self.events.length < self.payedLessonsCount, !self.isEditCount);
    // if (self.payedLessonsCount > 0 && self.events.length < self.payedLessonsCount && !self.isEditCount) {
    // 	self.createEventDialog(ev);
    // }
  }

  disableForm = () => {
    this.teacherService.disableForm(this.form);
    this.isEditMode = false;
  };
  enableForm = () => {
    this.emailUsed = false;
    this.teacherService.enableForm(this.form);
    this.isEditMode = true;
  };

  deleteStudent = () => {
    const user = this.student;
    // console.log(this.student);
    const dialogRef = this.deleteStudentDialog.open(DeleteUserDialogComponent, {data: user.username});
    // console.log(user);

    dialogRef.afterClosed().subscribe((result) => {
        // console.log(result);
        if (result) {
          this.teacherService.deleteTeacher(user);
          this.router.navigate(['/dashboard/students']);
        }
      },
      (error) => {
        // console.log(error);
      });
  };

  createEventDialog(event) {
    // // console.log(event.event);
    const dialogRef = this.dialog.open(CalendarCreateEventDialogComponent, {
      data: {event: event.event || {}, teachers_list: this.student.teachers || []}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result) {
        result['date_from'].setHours(12);
        result['date_to'].setHours(12);
        result['status_id'] = 1;
        result['role_id'] = 3;
        result['student_id'] = this.student.id;
        this.studentService.createCalendarEvent(result, (data) => {
          // // console.log(data);
          this.events = this.eventCalendarService.calendarOptions.events;
          this.ucCalendar.fullCalendar('refetchEvents');
        }, (error) => {
          // // console.log(error);
          this.toastr.error(error.error.error_description, error.error.status);
        });
      }
    });
  }

  openEditEventDialog(event) {
    this.lessonStatusId = event['event']['status_id'];
    const dialogRef = this.dialog.open(CalendarEditEventDialogComponent, {
      data: {event: event.event, teachers_list: this.student.teachers}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result['student_id'] = this.student.id;
        if (result.remove) {
          this.studentService.deleteCalendarEvent(result.event['id'], {student_id: result['student_id']}, 3, (data) => {
            // this.events = data.data['calendar_list'];
            this.events = this.eventCalendarService.calendarOptions.events;
            if (this.lessonStatusId === 4) {
              this.payedLessonsCount++;
              this.toastr.warning('Проведенное занятие было удалено. +1 к оплаченым урокам', 'Удаление');
            } else {
              this.toastr.warning('Событие удалено', 'Удаление');
            }
          }, (error) => {
            // console.log(error);
          });
        } else {
          if (this.lessonStatusId !== 4 && result['status_id'] === 4 && this.payedLessonsCount === 0) {
            this.toastr.error('Невозможно изменить статус: количество оплаченых уроков равно нулю', 'Сохранение');
          } else {
            result['date'].setHours(12);
            result['role_id'] = 3;
            this.studentService.editCalendarEvent(result, (data) => {
              // // console.log(data);
              // this.events = data.data['calendar_list'];
              this.events = this.eventCalendarService.calendarOptions.events;
              if (this.lessonStatusId === 4 && result['status_id'] !== 4) {
                this.payedLessonsCount++;
                this.toastr.success('Проведенное занятие отменено. +1 к оплаченым урокам', 'Сохранение');
              } else if (this.lessonStatusId !== 4 && result['status_id'] === 4) {
                this.payedLessonsCount--;
                this.toastr.success('Занятие отмечено как проведенное. -1 к оплаченым урокам', 'Сохранение');
              } else {
                this.toastr.success('Событие успешно сохранено', 'Сохранение');
              }
            }, (error) => {
              // console.log(error);
            });
          }
        }
      } else {
        this.getEventsList();
      }
    });
  }

  private getEventsList() {
    this.eventCalendarService.getCalendarEvents(
      {student_id: this.studentId}, 3,
      (data) => {
        this.events = this.eventCalendarService.calendarOptions.events;
        // console.log(data);
      },
      (error) => {
        // console.log(error);
      }
    );
  }

  public onEnterEditCount(event) {
    if (event.target.value.length > 2) {
      event.preventDefault();
    } else {
      if (event.keyCode === 13) {
        this.editPayedLessonsCount(true);
      }
    }
  }

  public setEditCount() {
    if (this.authService.getRole() === 1) {
      this.isEditCount = true;
      this.plc.nativeElement.focus();
    }
  }

  public editPayedLessonsCount(acceptSave) {
    if (acceptSave === true) {
      this.studentService.editLessonCount({
          id: this.studentId,
          lesson_qnt: Number(this.payedLessonsCount)
        },
        (data) => {
          // console.log(data);
          this.isEditCount = false;
          this.payedLessonsCount_tmp = this.payedLessonsCount;
          this.toastr.success('Количество оплаченных уроков изменено', 'Сохранение');
        },
        (error) => {
          this.payedLessonsCount = this.payedLessonsCount_tmp;
          this.toastr.error('Число должно находиться в интервале от 0 до 999', error.error.status);
        }
      );
    } else {
      this.payedLessonsCount = this.payedLessonsCount_tmp;
      this.isEditCount = false;
    }
  }
}
