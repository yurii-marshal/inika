import {DeleteLessonDialogComponent} from './delete-lesson-dialog/delete-lesson-dialog.component';
import {CreateLessonDialogComponent} from './create-lesson-dialog/create-lesson-dialog.component';

import {Component, Inject, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  PageEvent,
  Sort
} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {TeacherApiService} from '../../../services/api/teacher-api.service';
import {Subscription} from 'rxjs/Subscription';
import {CourseApiService} from '../../../services/api/course-api.service';
import {AuthService} from '../../../services/auth.service';

// import {UserApiService} from '../../services/api/user-api.service';

@Component({
  selector: 'in-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['lesson', 'keywords'];
  dataSource;
  selection;
  pageIndex: number;
  pageSize = 20;
  length: number;
  pageSizeOptions: number[] = [10, 20];
  headerContainer = null;
  lessonColumnWidth = false;
  lessons: any [];
  lessonsSub: Subscription;
  courseId;
  data: { lessonName: string; keywords: string[] };

  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('lesson') lesson;

  // constructor(public dialog: MatDialog,
  //             private router: Router,
  //             private userService: UserApiService) {
  // }
  constructor(public dialog: MatDialog,
              private router: Router,
              public teacherService: TeacherApiService,
              private courseService: CourseApiService,
              private deleteLessonDialog: MatDialog,
              private createLessonDialog: MatDialog,
              public authService: AuthService,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.authService.getRole() === 1) {
      this.displayedColumns = this.displayedColumns.concat(['controls']);
    }    if (this.activeRoute.snapshot.params.id) {
      this.courseId = this.courseService.currentCourseId = this.teacherService.courseId = this.activeRoute.snapshot.params.id;
    } else if (this.courseService.currentCourseId) {
      this.courseId = this.courseService.currentCourseId;
    } else {
      this.router.navigate(['/dashboard/courses/']);
    }
    this.teacherService.getLessons(this.courseId);
    this.getServerData();
    this.lessonsSub = this.teacherService.getLessonsUpdatedListener()
      .subscribe((responseData) => {
        setTimeout(() => {
          this.lessons = responseData;
          // // console.log('%c getLessonsUpdatedListener this.lessons: ', 'background: #444; color: #01FF70');
          // // console.log(this.lessons);

          this.dataSource = new MatTableDataSource<any>(this.lessons);
          this.selection = new SelectionModel<any>(true, []);
          this.pageIndex = 0;
          this.pageSize = 10;
          this.length = this.lessons.length;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      });
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.lessonsSub.unsubscribe();
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

  getServerData(event?: PageEvent) {
    // TODO: get data from response

    // this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    // this.pageIndex = 0;
    // this.pageSize = 10;
    // this.length = ELEMENT_DATA.length;
  }

  openTeacherProfile(item) {
    // // console.log(item);
    this.router.navigate(['/dashboard/teacher-profile', item.id]);
  }

  openStudentProfile(item) {
    // // console.log(item);
    this.router.navigate(['/dashboard/teacher-profile', item.id]);
  }

  editLesson(element) {
    const dialogRef = this.createLessonDialog.open(CreateLessonDialogComponent, {
      data: {lessonName: element.name, keywords: element.description, isEdit: true}
    });

    dialogRef.afterClosed().subscribe((value) => {
      // console.log(value);
      if (value) {
        this.teacherService.updateLesson({
          id: element.id,
          name: value.lessonName,
          courseId: this.courseId,
          keywords: value.keywords
        });
      }
    });
  }

  createLesson = () => {
    const dialogRef = this.createLessonDialog.open(CreateLessonDialogComponent, {
      data: {isEdit: false}
    });

    dialogRef.afterClosed().subscribe((value) => {
      // // console.log('%c createLesson value ', 'background: #444; color: #01FF70');
      if (value) {
        const lesson = {
          courseId: this.courseId,
          lessonName: value.lessonName
        };
        if (value.keywords) {
          lesson['description'] = value.keywords;
        }
        // // console.log('%c createLesson lesson ', 'background: #444; color: #01FF70');
        // // console.log(lesson);
        this.teacherService.createLesson(lesson);
        // this.teacherService.getLessons(this.courseId);
      }
    });

    // this.router.navigate([ '/dashboard/students' ]);
  };
  deleteLesson = (element) => {
    // // console.log('%c deleteLesson element ', 'background: #444; color: #01FF70');
    // // console.log(element);
    const dialogRef = this.deleteLessonDialog.open(DeleteLessonDialogComponent, {
      data: {
        name: element.name
      }
    });

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.teacherService.deleteLesson(element.id);
      }
    });

    // this.router.navigate([ '/dashboard/students' ]);
  };
}

export interface PeriodicElement {
  id: number;
  lesson: { name: string; description: string };
  keywords: string[];
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    lesson: {name: 'Lesson 01: Introduction', description: '/'},
    keywords: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 1,
    lesson: {name: 'Lesson 02: English for everyone', description: '/'},
    keywords: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 1,
    lesson: {name: 'Lesson 03: Articles', description: '/'},
    keywords: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 1,
    lesson: {name: 'Lesson 04: English idioms', description: '/'},
    keywords: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 1,
    lesson: {name: 'Lesson 04: English idioms', description: '/'},
    keywords: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 1,
    lesson: {name: 'Lesson 04: English idioms', description: '/'},
    keywords: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 1,
    lesson: {name: 'Lesson 04: English idioms', description: '/'},
    keywords: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
  },
  {
    id: 1,
    lesson: {name: 'Lesson 04: English idioms', description: '/'},
    keywords: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }
];
