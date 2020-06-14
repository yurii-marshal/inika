///<reference path="../teacher.model.ts"/>
import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TeacherApiService} from '../../../services/api/teacher-api.service';
import {Teacher} from '../teacher.model';
import {mimeType} from '../../../validators/mime-type.validator';
import {Subscription} from 'rxjs/Subscription';
import {MatDialog} from '@angular/material';
import {DeleteTeacherDialogComponent} from '../delete-teacher-dialog/delete-teacher-dialog.component';
import {EventCalendarService} from '../../../services/eventCalendar.service';
import {CalendarComponent} from 'ng-fullcalendar';
import {CalendarCreateEventDialogComponent} from '../../calendar-create-event-dialog/calendar-create-event-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {CalendarEditEventDialogComponent} from '../../calendar-edit-event-dialog/calendar-edit-event-dialog.component';
import {StudentApiService} from '../../../services/api/student-api.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'in-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherCreateComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  form: FormGroup;
  selectedTabIndex: any;
  imagePreview: string;
  emailUsed: any;
  teacher: any;
  isEditMode: boolean;
  private mode = 'create';
  private teacherId: string;
  createUser = false;
  coursesList: any[];
  studentsList: any[];
  studentsListSub: Subscription;
  coursesListSub: Subscription;
  getTeacherSub: Subscription;
  lessonStatusId: number;

  events = [];

  public ec = this.eventCalendarService;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(public teacherService: TeacherApiService,
              private deleteTeacherDialog: MatDialog,
              public eventCalendarService: EventCalendarService,
              public route: ActivatedRoute,
              public studentService: StudentApiService,
              public dialog: MatDialog,
              public authService: AuthService,
              private toastr: ToastrService,
              private cdRef: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit() {
    this.eventCalendarService.calendarOptions['editable'] = false;
    this.teacherService.getTeachers({});
    this.createUser = this.teacherService.createUser;

    this.form = new FormGroup({
      studentsInputField: new FormControl({value: null, disabled: false}),
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
    this.initTeacher();
  }

  ngAfterViewInit() {
    this.teacherService.getActiveCourses();
    this.coursesListSub = this.teacherService.getActiveCoursesUpdatedListener()
      .subscribe((responsData: any) => {
        this.coursesList = responsData;
      });

    this.teacherService.getStudents({});
    this.studentsListSub = this.teacherService.getStudentsUpdateListener()
      .subscribe((userData) => {
        this.studentsList = userData.map((student) => {
          return {id: student.id, name: student.username};
        });
      });
    this.selectedTabIndex = this.teacherService.selectedTabIndex;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  initTeacher() {
    this.emailUsed = false;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('teacherId')) {
        this.mode = 'edit';
        this.teacherId = paramMap.get('teacherId');
        this.teacherService.getUser(this.teacherId).subscribe(teacherData => {
          // // console.log('%c TeacherCreateComponent OnInit: ', 'background: #444; color: #01FF70');
          // console.log(teacherData);
          if (this.teacherService.editMode) {
            // // console.log('%c teacher create this.teacherService.editMode ', 'background: #444; color: #01FF70');
            // console.log(this.teacherService.editMode);
            this.enableForm();
            this.teacherService.editMode = false;
          }
          this.teacher = {
            id: teacherData['data'].user.id,
            username: teacherData['data'].user.username,
            address: teacherData['data'].user.address,
            activity: teacherData['data'].user.activity,
            phone: teacherData['data'].user.phone,
            skype: teacherData['data'].user.skype,
            email: teacherData['data'].user.email,
            role_id: teacherData['data'].user.role_id,
            students: teacherData['data'].user.students || [],
            courses: teacherData['data'].user.courses || [],
            lessons: teacherData['data'].user.lessons,
            avatar_img: teacherData['data'].user.avatar_url || this.imagePreview
          };
          this.form.patchValue({
            username: this.teacher.username,
            address: this.teacher.address,
            activity: this.teacher.activity,
            phone: this.teacher.phone,
            skype: this.teacher.skype,
            email: this.teacher.email,
            avatar_img: this.teacher.avatar_img,
            coursesInputField: this.teacher.courses.map(student => {
              return parseInt(student.id, 10);
            }),
            studentsInputField: this.teacher.students.map(student => {
              return parseInt(student.id, 10);
            })
          });

          // // console.log('%c teacherData[\'data\'].user.courses: ', 'background: #444; color: #01FF70');
          // console.log(teacherData['data'].user.courses);
          // // console.log('%c this.usersList: ', 'background: #444; color: #01FF70');
          // console.log(this.coursesList);

          this.imagePreview = teacherData['data'].user.avatar_url;

          if (!this.imagePreview) {
            this.imagePreview = this.teacherService.defaultImage;
            // console.log('%c this.imagePreview OnInit: ', 'background: #444; color: #01FF70');
            // console.log(this.imagePreview);
          }

          // // console.log('%c this.imagePreview after setValue:  ', 'background: #444; color: #01FF70');
          // // console.log(this.imagePreview);
        });
        this.getEventsList();
      } else {
        this.enableForm();
        this.mode = 'create';
        this.teacherId = null;
        this.imagePreview = this.teacherService.defaultImage;
      }
    });
  }

  cancelEdit() {
    if (this.teacherId === null) {
      this.router.navigate(['/dashboard/teachers']);
    }
    this.teacherService.createUser = false;
    this.initTeacher();
    this.disableForm();
  }

  onSaveTeacher() {
    if (this.form.invalid) {
      return;
    }

    let teacher: any;

    if (this.mode === 'create') {
      teacher = {
        username: this.form.value.username,
        address: this.form.value.address,
        activity: this.form.value.activity,
        phone: this.form.value.phone,
        skype: this.form.value.skype,
        email: this.form.value.email,
        file: this.form.value.avatar_img || null,
        students: this.form.value.studentsInputField || [],
        courses: this.form.value.coursesInputField || [],
        role_id: '2'
      };
      console.log(teacher);
      this.teacherService.createNewUser(teacher, () => {
        this.disableForm();
        this.emailUsed = false;
        this.toastr.success('Профиль преподавателя успешно создан', teacher['username']);
        this.form.reset();
      }, (err) => {
        this.emailUsed = err;
      });
      this.emailUsed = this.teacherService.emailUsed;
      if (this.emailUsed === false) {
        this.disableForm();
      }

    } else {
      // // console.log('%c TeacherCreateComponent update teacher:', 'background: #444; color: #01FF70');

      // // console.log('%c teacherCreate onSaveTeacher UPDATE InputFields: ', 'background: #444; color: #01FF70');
      // console.log(this.form.value.coursesInputField);
      // console.log(this.form.value.studentsInputField);
      teacher = {
        id: this.teacher.id,
        username: this.form.value.username,
        address: this.form.value.address || '',
        activity: this.form.value.activity || '',
        phone: this.form.value.phone || '',
        skype: this.form.value.skype || '',
        email: this.form.value.email || '',
        file: this.form.value.avatar_img || null,
        courses: this.form.value.coursesInputField || [],
        students: this.form.value.studentsInputField || [],
        teachers: this.form.value.teachersInputField || [],
        role_id: '2'
      };
      // console.log(teacher);

      this.teacherService.updateUser(teacher, () => {
        this.disableForm();
        this.emailUsed = false;
        this.toastr.success('Профиль преподавателя успешно обновлен', teacher['username']);
        this.getTeacherSub = this.teacherService.getUser(this.teacherId)
          .subscribe((resp) => {
            this.teacher.students = resp['data'].user.students;
            this.teacher.courses = resp['data'].user.courses;
          });
      }, (err) => {
        this.emailUsed = err;
      });
    }
  }

  ngOnDestroy() {
    this.studentsListSub.unsubscribe();
    this.coursesListSub.unsubscribe();
    if (this.getTeacherSub) {
      this.getTeacherSub.unsubscribe();
    }
    this.teacherService.createUser = false;
    this.eventCalendarService.calendarOptions['editable'] = true;
    this.eventCalendarService.calendarOptions.events = [];
  }

  private getEventsList() {
    this.eventCalendarService.getCalendarEvents(
      {teacher_id: this.teacherId}, 2,
      (data) => {
        this.events = data['calendar_list'];
        // console.log(data);
      },
      (error) => {
        // console.log(error);
      }
    );
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

    // // console.log('%c onImagePicked file: ', 'background: #444; color: #01FF70');
    // console.log(file);
    // // console.log('%c onImagePicked this.form: ', 'background: #444; color: #01FF70');
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
    // console.log(ev);
    self.createEventDialog(ev);
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
  deleteTeacher = () => {
    const user = this.teacher;
    const dialogRef = this.deleteTeacherDialog.open(DeleteTeacherDialogComponent, {data: user.username});
    // // console.log('%c teachers Component deleteTeacher event: ', 'background: #444; color: #01FF70');
    // console.log(user);

    dialogRef.afterClosed().subscribe((result) => {
        // // console.log('%c dialogRef.afterClosed  result: ', 'background: #444; color: #01FF70');
        // console.log(result);
        if (result) {
          this.teacherService.deleteTeacher(user);
          this.router.navigate(['/dashboard/teachers']);
        }
      },
      (error) => {
        // // console.log('%c deleteTeacher error ', 'background: #444; color: #01FF70');
        // console.log(error);
      });
  };

  createEventDialog(event) {
    // // console.log(event.event);
    const dialogRef = this.dialog.open(CalendarCreateEventDialogComponent, {
      data: {event: event.event || {}, students_list: this.teacher.students}
    });

    dialogRef.afterClosed().subscribe(result => {
      // // console.log(result);
      if (result) {
        result['date_from'].setHours(12);
        result['date_to'].setHours(12);
        result['status_id'] = 1;
        result['role_id'] = 2;
        result['teacher_id'] = this.teacher.id;
        this.studentService.createCalendarEvent(result, (data) => {
          // // console.log(data);
          // this.events = data.data['calendar_list'];
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
      data: {event: event.event, students_list: this.teacher.students}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result['teacher_id'] = this.teacher.id;
        if (result.remove) {
          this.studentService.deleteCalendarEvent(result.event['id'], {teacher_id: result['teacher_id']}, 2, (data) => {
            // // console.log(data);
            // this.events = data.data['calendar_list'];
            // if (this.lessonStatusId === 4) {
            // 	this.payedLessonsCount++;
            // 	this.toastr.warning('Проведенное занятие было удалено. +1 к оплаченым урокам', 'Удаление');
            // } else {
            this.events = this.eventCalendarService.calendarOptions.events;
            this.toastr.warning('Событие удалено', 'Удаление');
            // }
          }, (error) => {
            // console.log(error);
          });
        } else {
          // if (this.lessonStatusId !== 4 && result['status_id'] === 4 && this.payedLessonsCount === 0) {
          // 	this.toastr.error('Невозможно изменить статус: количество оплаченых уроков равно нулю', 'Сохранение');
          // } else {
          result['role_id'] = 2;
          result['date'].setHours(12);
          this.studentService.editCalendarEvent(result, (data) => {
            // // console.log(data);
            // this.events = data.data['calendar_list'];
            // if (this.lessonStatusId === 4 && result['status_id'] !== 4) {
            // 	this.payedLessonsCount++;
            // 	this.toastr.success('Проведенное занятие отменено. +1 к оплаченым урокам', 'Сохранение');
            // } else if (this.lessonStatusId !== 4 && result['status_id'] === 4) {
            // 	this.payedLessonsCount--;
            // 	this.toastr.success('Занятие отмечено как проведенное. -1 к оплаченым урокам', 'Сохранение');
            // } else {
            this.events = this.eventCalendarService.calendarOptions.events;
            this.toastr.success('Событие успешно сохранено', 'Сохранение');
            // }
          }, (error) => {
            // console.log(error);
          });
          // }
        }
      } else {
        // this.getEventsList();
      }
    });
  }

}
