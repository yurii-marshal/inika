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
// import { SimpleConfirmDialogComponent } from './simple-confirm-dialog/simple-confirm-dialog.component';
import {Router} from '@angular/router';
import {DeleteUserDialogComponent} from './student-profile/delete-user-dialog/delete-user-dialog.component';
import {TeacherApiService} from '../../services/api/teacher-api.service';
import {Student} from './student.model';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'in-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['student', 'teacher', 'course', 'lesson_qnt'];
  dataSource;
  selection = new SelectionModel<PeriodicElement>(true, []);
  pageIndex: number;
  pageSize: number;
  length: number;
  pageSizeOptions: number[] = [10, 20];
  headerContainer: HTMLElement = null;
  pageEvent: PageEvent;
  studentsList: any;
  studentsListSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              public authService: AuthService,
              private router: Router,
              private userService: TeacherApiService,
              private deleteUserDialog: MatDialog) {
  }

  ngOnInit() {
    if (this.authService.getRole() === 1) {
      this.displayedColumns = this.displayedColumns.concat(['controls']);
    }
    this.getStudents({});
    // this.getServerData();
  }

  getStudentsTable = () => {
    setTimeout(() => {
      this.pageSize = this.pageSizeOptions[0];
      this.dataSource = new MatTableDataSource<any>(this.studentsList);
      this.pageIndex = 0;
      this.length = this.studentsList.length;
    });
  };

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

  openConfirmDialog(): void {
  }

  sortData(sort: Sort) {
    // console.log(sort);
    this.getStudents({'orderBy': [sort.active, sort.direction]});
  }

  getStudents(data) {
    this.userService.getStudents(data);
    this.studentsListSub = this.userService.getStudentsUpdateListener()
      .subscribe((userData) => {
        // console.log(userData);
        this.studentsList = userData;
        this.getStudentsTable();
        this.setTableSettings();
      });
  };

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

  // getServerData(event?: PageEvent) {
  //   // TODO: get data from response
  //   this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  //   this.pageIndex = 0;
  //   this.pageSize = 20;
  //   this.length = ELEMENT_DATA.length;
  //
  // }

  openStudentProfile(item) {
    this.userService.selectedTabIndex = 0;
    this.router.navigate(['/dashboard/students/edit', item.id]);
  }

  openCourse(item) {
    // console.log(item);
    this.router.navigate(['/dashboard/course-profile/', item.id]);
  }

  openTeacherProfile(item) {
    this.userService.selectedTabIndex = 0;
    this.router.navigate(['/dashboard/teachers/edit', item.id]);
  }

  editStudentProfile(item) {
    this.userService.editMode = true;
    this.userService.selectedTabIndex = 1;
    this.router.navigate(['/dashboard/students/edit', item.id]);
  }

  createStudent() {
    this.userService.defaultImage = '../../../../assets/images/defaultAvatar.png';
    this.userService.createUser = true;
    this.userService.selectedTabIndex = 1;
    this.router.navigate(['/dashboard/students/create-student']);
  }

  public deleteStudent = (user: string) => {
    const username = user['username'];
    const dialogRef = this.deleteUserDialog.open(DeleteUserDialogComponent, {data: username});
    // console.log('%c deleteStudent username ', 'background: #444; color: #01FF70');
    // console.log(username);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('%c deleteStudent result ', 'background: #444; color: #01FF70');
      // console.log(result);
      if (result) {
        this.userService.deleteTeacher(user);
        this.router.navigate(['/dashboard/students']);
      }
    });

    // this.router.navigate([ '/dashboard/students' ]);
  };

  ngOnDestroy() {
    this.studentsListSub.unsubscribe();
  }

}

export interface PeriodicElement {
  id: number;
  student: { name: string; profile: string };
  teacher: { name: string; profile: string };
  course: { name: string; description: string };
  lesson_qnt: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    student: {name: 'Мясников Евгений', profile: '/'},
    teacher: {name: 'Козерод Алина', profile: '/'},
    course: {name: 'Beginer', description: '/'},
    lesson_qnt: 2
  },
  {
    id: 1,
    student: {name: 'Громов Андрей', profile: '/'},
    teacher: {name: 'Шевченко Марина', profile: '/'},
    course: {name: 'Pre-Intermediate', description: '/'},
    lesson_qnt: 2
  },
  {
    id: 1,
    student: {name: 'Якушев Матвей', profile: '/'},
    teacher: {name: 'Шолудеко Анастасия', profile: '/'},
    course: {name: 'Intermediate', description: '/'},
    lesson_qnt: 22
  },
  {
    id: 1,
    student: {name: 'Антонов Матвей', profile: '/'},
    teacher: {name: 'Шолудеко Анастасия', profile: '/'},
    course: {name: 'Intermediate', description: '/'},
    lesson_qnt: 55
  },
  {
    id: 1,
    student: {name: 'Гуляев Матвей', profile: '/'},
    teacher: {name: 'Шолудеко Анастасия', profile: '/'},
    course: {name: 'Advanced', description: '/'},
    lesson_qnt: 32
  },
  {
    id: 1,
    student: {name: 'Щукин Анатолий', profile: '/'},
    teacher: {name: 'Шевченко Марина', profile: '/'},
    course: {name: 'Uper-Intermediate', description: '/'},
    lesson_qnt: 59
  },
  {
    id: 1,
    student: {name: 'Филатов Аркадий', profile: '/'},
    teacher: {name: 'Шолудеко Анастасия', profile: '/'},
    course: {name: 'Intermediate', description: '/'},
    lesson_qnt: 18
  }
];
