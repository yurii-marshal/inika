import {DeleteTeacherDialogComponent} from './delete-teacher-dialog/delete-teacher-dialog.component';

import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  PageEvent,
  Sort
} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

import {Router} from '@angular/router';
import {TeacherApiService} from '../../services/api/teacher-api.service';
import {Teacher} from './teacher.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'in-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['teacher', 'student', 'course', 'lesson_qnt'];
  dataSource;
  selection = new SelectionModel<Teacher>(true, []);
  pageIndex: number;
  pageSize: number;
  length: number;
  pageSizeOptions: number[] = [10, 15];
  headerContainer = null;
  fromTeachersTable: boolean;

  teachersList: Teacher[] = [];
  private teacherSub: Subscription;
  // dataSource: any = new MatTableDataSource<Teacher>(this.teachersList);

  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              public authService: AuthService,
              private router: Router,
              private deleteTeacherDialog: MatDialog,
              public teacherService: TeacherApiService) {
  }

  ngOnInit() {
    if (this.authService.getRole() === 1) {
      this.displayedColumns = this.displayedColumns.concat(['controls']);
    }
    this.getTeachers({});
  }

  ngOnDestroy() {
    this.teacherSub.unsubscribe();
  }

  setTableSettings = () => {
    setTimeout(() => {
      this.pageSize = this.pageSizeOptions[0];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.headerContainer = document.querySelector('.mat-sort-header-container');
      this.headerContainer.style.alignItems = 'center';
    });
  };

  ngAfterViewInit() {

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openConfirmDialog(): void {
  }

  sortData(sort: Sort) {
    // console.log(sort);
    this.getTeachers({'orderBy': [sort.active, sort.direction]});
  }

  getTeachers(data) {
    this.teacherService.getTeachers(data);
    this.teacherSub = this.teacherService.getTeachersUpdateListener()
      .subscribe((teachers: Teacher[]) => {
        this.teachersList = teachers;
        this.getTeachersTable();
        this.setTableSettings();
      });
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

  getTeachersTable() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource<Teacher>(this.teachersList);
      this.pageIndex = 0;
      this.pageSize = this.pageSizeOptions[0];
      this.length = this.teachersList.length;
      this.dataSource.paginator = this.paginator;
    });
  }

  openTeacherProfile(item) {
    this.teacherService.selectedTabIndex = 0;
    this.router.navigate(['/dashboard/teachers/edit', item.id]);
  }

  openStudentProfile(item) {
    this.teacherService.selectedTabIndex = 0;
    this.router.navigate(['/dashboard/students/edit', item.id]);
  }

  openCourse(item) {
    // console.log(item);
    this.router.navigate(['/dashboard/course-profile/', item.id]);
  }

  editTeacherProfile(item) {
    this.teacherService.selectedTabIndex = 1;
    this.teacherService.editMode = true;
    this.router.navigate(['/dashboard/teachers/edit', item.id]);
  }

  createTeacher() {
    this.teacherService.defaultImage = '../../../../assets/images/defaultAvatar.png';
    this.teacherService.createUser = true;
    this.teacherService.selectedTabIndex = 1;
    this.router.navigate(['/dashboard/teachers/create-teacher']);
  }

  deleteTeacher = (user: string) => {
    const username = user['username'];
    const dialogRef = this.deleteTeacherDialog.open(DeleteTeacherDialogComponent, {data: username});
    // console.log('%c teachers Component deleteTeacher teacherId: ', 'background: #444; color: #01FF70');
    // console.log(username);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('%c dialogRef.afterClosed  result: ', 'background: #444; color: #01FF70');
      // console.log(result);
      if (result) {
        this.teacherService.deleteTeacher(user);
        this.router.navigate(['/dashboard/teachers']);
      }
    });
  };


}

// export interface PeriodicElement {
//   id: number;
//   students: { name: string; profile: string }[];
//   teacher: string;
//   courses: { name: string; description: string }[];
//   lessonsCompleted: number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     id: 1,
//     teacher: 'Козерод Алина',
//     students: [
//       {name: 'Антонов Матвей', profile: '/'},
//       {name: 'Мясников Евгений', profile: '/'},
//       {name: 'Антонов Матвей', profile: '/'},
//       {name: 'Филатов Аркадий', profile: '/'}
//     ],
//     courses: [{name: 'Beginner', description: '/'}],
//     lessonsCompleted: 123
//   },
//   {
//     id: 1,
//     teacher: 'Шевченко Марина',
//     students: [{name: 'Щукин Анатолий', profile: '/'}],
//     courses: [{name: 'Beginner', description: '/'}],
//     lessonsCompleted: 22
//   },
//   {
//     id: 1,
//     teacher: 'Шолудеко Анастасия',
//     students: [
//       {name: 'Орехов Борис', profile: '/'},
//       {name: 'Морозов Богдан', profile: '/'},
//       {name: 'Артемьев Данила', profile: '/'},
//       {name: 'Якушев Матвей', profile: '/'},
//       {name: 'Семёнов Леонид', profile: '/'}
//     ],
//     courses: [
//       {name: 'Elementary', description: '/'},
//       {name: 'Intermediate', description: '/'},
//       {name: 'Upper Intermediate', description: '/'},
//       {name: 'Advanced', description: '/'}
//     ],
//     lessonsCompleted: 35
//   }
// ];
