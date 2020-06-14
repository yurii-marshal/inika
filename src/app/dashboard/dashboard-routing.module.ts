import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {StartingPageComponent} from './starting-page/starting-page.component';
import {ProfileComponent} from './profile/profile.component';
import {VocabularyComponent} from './vocabulary/vocabulary.component';
import {LessonsComponent} from './lessons/lessons.component';
import {HometasksComponent} from './hometasks/hometasks.component';
import {StudentsComponent} from './students/students.component';
import {MyCoursesComponent} from './my-courses/my-courses.component';
import {CoursesComponent} from './courses/courses.component';
import {CourseComponent} from './courses/course/course.component';
import {TeacherLessonDetailsTableComponent} from './teacher-lesson-details-table/teacher-lesson-details-table.component';
import {StudentProfileComponent} from './students/student-profile/student-profile.component';
import {TeachersComponent} from './teachers/teachers.component';
import {TeacherProfileComponent} from './teachers/teacher-profile/teacher-profile.component';
import {LessonPageComponent} from './lessons/lesson-page/lesson-page.component';
import {TeacherCreateComponent} from './teachers/teacher-create/teacher-create.component';
import {StudentCreateComponent} from './students/student-create/student-create.component';
import {AdminProfileComponent} from './admin-profile/admin-profile.component';
import {AuthorizationGuard} from '../services/authorization.guard';
import {RoleGuard} from '../services/role.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthorizationGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: StartingPageComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 2, 3]
        }
      },
      {
        path: 'lessons',
        component: LessonsComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 2, 3]
        }
      },
      {
        path: 'lessons/:id',
        component: LessonPageComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 2, 3]
        }
      },
      {
        path: 'hometasks',
        component: HometasksComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 2, 3]
        }
      },
      {
        path: 'hometasks',
        component: HometasksComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 2, 3]
        }
      },
      {
        path: 'profile',
        component: AdminProfileComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 2, 3]
        }
      },
      {
        path: 'vocabulary',
        component: VocabularyComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 2, 3]
        }
      },
      {
        path: 'students',
        component: StudentsComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 2]
        }
      },
      {
        path: 'student-profile/:id',
        component: StudentProfileComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 2]
        }
      },
      {
        path: 'teacher-profile/:id',
        component: TeacherProfileComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1]
        }
      },
      {
        path: 'course-profile/:id',
        component: CourseComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 2, 3]
        }
      },
      {
        path: 'my-courses',
        component: MyCoursesComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 2, 3]
        }
      },
      {
        path: 'courses',
        component: CoursesComponent,
        data: {
          accessLevels: [1, 2, 3]
        }
      },
      {
        path: 'courses/course',
        component: CourseComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 2, 3]
        }
      },
      {
        path: 'table',
        component: TeacherLessonDetailsTableComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 2, 3]
        }
      },
      {
        path: 'teachers',
        component: TeachersComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1, 3]
        }
      },
      {
        path: 'teachers/edit/:teacherId',
        component: TeacherCreateComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1]
        }
      },
      {
        path: 'teachers/create-teacher',
        component: TeacherCreateComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1]
        }
      },
      {
        path: 'students/edit/:studentId',
        component: StudentCreateComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1]
        }
      },
      {
        path: 'students/create-student',
        component: StudentCreateComponent,
        canActivate: [RoleGuard],
        data: {
          accessLevels: [1]
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
