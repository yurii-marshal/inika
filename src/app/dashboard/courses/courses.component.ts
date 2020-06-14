import {DeleteCourseDialogComponent} from './delete-course-dialog/delete-course-dialog.component';
import {CreateCourseDialogComponent} from './create-course-dialog/create-course-dialog.component';
import {EditCourseDialogComponent} from './edit-course-dialog/edit-course-dialog.component';
import {style} from '@angular/animations';

import {Component, Inject, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';

import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';
import {TeacherApiService} from '../../services/api/teacher-api.service';
import {Course} from '../../Models/course.model';
import {Subscription} from 'rxjs/Subscription';
import {CourseApiService} from '../../services/api/course-api.service';
import {LocalstorageService} from '../../services/localstorage.service';
import {AuthService} from '../../services/auth.service';

// import {UserApiService} from '../../services/api/user-api.service';

@Component({
  selector: 'in-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['course', 'teachers', 'students'];
  dataSource;
  selection;
  pageIndex: number;
  pageSize = 20;
  length: number;
  pageSizeOptions: number[] = [10, 20];
  headerContainer = null;
  courseName: string;
  coursesSub: Subscription;
  courses: any;

  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('toggleButton') toggleButton: any;

  // constructor(public dialog: MatDialog,
  //             private router: Router,
  //             private userService: UserApiService) {
  // }
  constructor(private router: Router,
              private coursesService: CourseApiService,
              private deleteCourseDialog: MatDialog,
              private createCourseDialog: MatDialog,
              public authService: AuthService,
              public editCourseDialog: MatDialog,
              private storageService: LocalstorageService,
              private teacherService: TeacherApiService) {
  }

  ngOnInit() {
    if (this.authService.getRole() === 1) {
      this.displayedColumns = this.displayedColumns.concat(['access', 'controls']);
    }
    this.initDataTable();
    this.getCourses();
  }

  ngOnDestroy() {
    this.coursesSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.headerContainer = document.querySelector('.mat-sort-header-container');
    // this.headerContainer.style.alignItems = 'center';

    // this.arrow.classList.add('mat-sort-header-sorted');
  }

  getCourses() {
    this.teacherService.getCourses();
    this.coursesSub = this.teacherService.getCoursesUpdatedListener()
      .subscribe((coursesResp) => {
        setTimeout(() => {
          this.courses = coursesResp;
          this.dataSource = new MatTableDataSource<any>(this.courses);
          this.selection = new SelectionModel<any>(true, []);
          this.length = this.courses.length;
          this.dataSource.paginator = this.paginator;
        });
      });
  }

  openConfirmDialog(): void {
  }

  sortData(sort: Sort) {
    // console.log(sort);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  initDataTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>();
    this.pageIndex = 0;
    this.pageSize = 10;
    // this.length = ELEMENT_DATA.length;
  }

  openTeacherProfile(item) {
    // console.log(item);
    this.router.navigate(['/dashboard/teachers/edit/', item.id]);
  }

  openStudentProfile(item) {
    // console.log(item);
    this.router.navigate(['/dashboard/students/edit/', item.id]);
  }

  openCoursePage(element) {
    // console.log(element);
    this.storageService.write('currentCourseId', element.id);
    this.coursesService.currentCourseId = element.id;
    this.teacherService.getLessons(element.id);
    this.router.navigate(['/dashboard/course-profile', element.id]);
  }

  editCourse(element) {
    const course = {course_id: element.id, name: element.name};
    const dialogRef = this.editCourseDialog.open(EditCourseDialogComponent, {
      data: {courseName: course.name}
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('%c editCourse close ', 'background: #444; color: #01FF70');
      // console.log(result);

      if (result) {
        course.name = result;
        this.teacherService.updateCourse(course);
      }
    });
    // console.log('item: ');
    // console.log(element);
  }

  createCourse() {
    this.courseName = '';
    const dialogRef = this.createCourseDialog.open(CreateCourseDialogComponent,
      {
        data: {courseName: this.courseName}
      });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result) {
        const course: any = {name: result, is_active: 0};
        this.teacherService.addCourse(course, () => {
          this.getCourses();
        });
      }
    });
    // this.router.navigate([ '/dashboard/teacher-profile', 'new' ]);
  }

  toggle = (element, toggleButton) => {
    const tog = !toggleButton.checked;
    if (tog === true) {
      this.teacherService.updateCourse({course_id: element.id, name: element.name, is_active: 1});
    }
    if (tog === false) {
      this.teacherService.updateCourse({course_id: element.id, name: element.name, is_active: 0});
    }
  };

  deleteCourse = (element) => {
    const course = {course_id: element.id, name: element.name};
    const dialogRef = this.deleteCourseDialog.open(DeleteCourseDialogComponent, {
      data: {courseName: course.name}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.teacherService.deleteCourse(course);
      }
    });

    // this.router.navigate([ '/dashboard/students' ]);
  };

  // deleteStudent(item, i) {
  //   // console.log(item, i);
  //   const dialogRef = this.dialog.open(SimpleConfirmDialogComponent, {
  //     width: '250px',
  //     data: {}
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     // console.log('The dialog was closed', result);
  //     if (result === true) {
  //       this.dataSource.data.splice(i, 1);
  //       this.getServerData();
  //       // // console.log(this.dataSource.data);
  //     }
  //   });
  // }
}

export interface PeriodicElement {
  id: number;
  students: { name: string; profile: string }[];
  teachers: { name: string; profile: string }[];
  course: { name: string; description: string };
}

// const ELEMENT_DATA: PeriodicElement[] = [
// 	{
// 		id: 1,
// 		teachers: [{name: 'Козерод Алина', profile: '/'}],
// 		students: [
// 			{name: 'Антонов Матвей', profile: '/'},
// 			{name: 'Мясников Евгений', profile: '/'},
// 			{name: 'Антонов Матвей', profile: '/'},
// 			{name: 'Филатов Аркадий', profile: '/'}
// 		],
// 		course: {name: 'Beginner', description: '/'}
// 	},
// 	{
// 		id: 1,
// 		teachers: [{name: 'Шевченко Марина', profile: '/'}, {name: 'Козерод Алина', profile: '/'}],
// 		students: [{name: 'Антонов Матвей', profile: '/'}, {name: 'Мясников Евгений', profile: '/'}],
// 		course: {name: 'Upper Intermediate', description: '/'}
// 	},
// 	{
// 		id: 1,
// 		teachers: [
// 			{name: 'Шевченко Марина', profile: '/'},
// 			{name: 'Шолудеко Анастасия', profile: '/'},
// 			{name: 'Козерод Алина', profile: '/'}
// 		],
// 		students: [
// 			{name: 'Антонов Матвей', profile: '/'},
// 			{name: 'Мясников Евгений', profile: '/'},
// 			{name: 'Орехов Борис', profile: '/'},
// 			{name: 'Морозов Богдан', profile: '/'},
// 			{name: 'Артемьев Данила', profile: '/'},
// 			{name: 'Якушев Матвей', profile: '/'}
// 		],
// 		course: {name: 'Intermediate', description: '/'}
// 	},
// 	{
// 		id: 1,
// 		teachers: [
// 			{name: 'Шевченко Марина', profile: '/'},
// 			{name: 'Шолудеко Анастасия', profile: '/'},
// 			{name: 'Козерод Алина', profile: '/'}
// 		],
// 		students: [
// 			{name: 'Антонов Матвей', profile: '/'},
// 			{name: 'Мясников Евгений', profile: '/'},
// 			{name: 'Орехов Борис', profile: '/'},
// 			{name: 'Морозов Богдан', profile: '/'}
// 		],
// 		course: {name: 'Advanced', description: '/'}
// 	}
// ];
