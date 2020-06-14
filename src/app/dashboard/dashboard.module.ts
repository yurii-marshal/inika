import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {StartingPageComponent} from './starting-page/starting-page.component';
import {MaterialModule} from '../material/material.module';
import {ProfileComponent} from './profile/profile.component';
import {VocabularyComponent} from './vocabulary/vocabulary.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {NavigationComponent} from './navigation/navigation.component';
import {CoursesComponent} from './courses/courses.component';
import {TeacherLessonsComponent} from './teacher-lessons/teacher-lessons.component';
import {LessonsComponent} from './lessons/lessons.component';
import {HometasksComponent} from './hometasks/hometasks.component';
import {MyCoursesComponent} from './my-courses/my-courses.component';
import {StudentsComponent} from './students/students.component';
import {VocabularyCardComponent} from './vocabulary-card/vocabulary-card.component';
import {HometasksCardComponent} from './hometasks-card/hometasks-card.component';
import {SingleLessonComponent} from './single-lesson/single-lesson.component';
import {HometaskComponent} from './hometask/hometask.component';
import {TeacherLessonsCardComponent} from './teacher-lessons-card/teacher-lessons-card.component';
import {TeacherSingleLessonComponent} from './teacher-single-lesson/teacher-single-lesson.component';
import {TeacherToolbarComponent} from './teacher-toolbar/teacher-toolbar.component';
import {TeacherNavigationComponent} from './teacher-navigation/teacher-navigation.component';
import {AdminNavigationComponent} from './admin-navigation/admin-navigation.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {TeachersListComponent} from './teachers-list/teachers-list.component';
import {CalendarComponent} from './calendar/calendar.component';
import {AdminMyCoursesComponent} from './admin-my-courses/admin-my-courses.component';
import {CourseProgressComponent} from './course-progress/course-progress.component';
import {SimpleConfirmDialogComponent} from './students/simple-confirm-dialog/simple-confirm-dialog.component';
import {SimpleConfirmDialogModule} from './students/simple-confirm-dialog/simple-confirm-dialog.module';
import {StudentProfileComponent} from './students/student-profile/student-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TeacherLessonDetailsTableComponent} from './teacher-lesson-details-table/teacher-lesson-details-table.component';
import {TeachersComponent} from './teachers/teachers.component';
import {CourseComponent} from './courses/course/course.component';
import {CreateCourseComponent} from './create-course/create-course.component';
import {DeleteUserDialogComponent} from './students/student-profile/delete-user-dialog/delete-user-dialog.component';
import {DeleteCourseDialogComponent} from './courses/delete-course-dialog/delete-course-dialog.component';
import {DeleteTeacherDialogComponent} from './teachers/delete-teacher-dialog/delete-teacher-dialog.component';
import {TeacherProfileComponent} from './teachers/teacher-profile/teacher-profile.component';
import {DeleteLessonDialogComponent} from './courses/course/delete-lesson-dialog/delete-lesson-dialog.component';
import {DeleteProfileDialogComponent} from './profile/delete-profile-dialog/delete-profile-dialog.component';
import {LessonPageComponent} from './lessons/lesson-page/lesson-page.component';
import {LessonPageModule} from './lessons/lesson-page/lesson-page.module';
import {DragulaModule} from 'ng2-dragula';
import {CreateCourseDialogComponent} from './courses/create-course-dialog/create-course-dialog.component';
import {CreateLessonDialogComponent} from './courses/course/create-lesson-dialog/create-lesson-dialog.component';
import {EditCourseDialogComponent} from './courses/edit-course-dialog/edit-course-dialog.component';
import {AutoSizeInputModule} from 'ngx-autosize-input';
import {ImageUploadModule} from 'angular2-image-upload';
import {FileUploadModule} from 'ng2-file-upload';
import {YoutubePlayerModule} from 'ng2-youtube-player';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TeacherCreateComponent} from './teachers/teacher-create/teacher-create.component';
import {NgDragDropModule} from 'ng-drag-drop';
import {ImageViewerModule} from 'ngx-image-viewer';
import {MusicService} from '../services/music.service';
import {StudentCreateComponent} from './students/student-create/student-create.component';
import {AdminProfileComponent} from './admin-profile/admin-profile.component';
import {LessonPageMaterialsModule} from './lessons/lessons-page-tabs/lesson-page-materials/lesson-page-materials.module';
import {LessonPageMaterialsComponent} from './lessons/lessons-page-tabs/lesson-page-materials/lesson-page-materials.component';
import {LessonPageWordsComponent} from './lessons/lessons-page-tabs/lesson-page-words/lesson-page-words.component';
import {LessonPageHometasksComponent} from './lessons/lessons-page-tabs/lesson-page-hometasks/lesson-page-hometasks.component';
import {LessonPageTestsComponent} from './lessons/lessons-page-tabs/lesson-page-tests/lesson-page-tests.component';

import {FullCalendarModule} from 'ng-fullcalendar';
import {CalendarCreateEventDialogComponent} from './calendar-create-event-dialog/calendar-create-event-dialog.component';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {AddExerciseMenuModule} from './lessons/lessons-page-tabs/add-exercise-menu/add-exercise-menu.module';
import {AddExerciseMenuComponent} from './lessons/lessons-page-tabs/add-exercise-menu/add-exercise-menu.component';

import {CalendarEditEventDialogComponent} from './calendar-edit-event-dialog/calendar-edit-event-dialog.component';

import {LessonContentFrameComponent} from './lessons/lessons-page-tabs/lesson-content-frame/lesson-content-frame.component';
import {CKEditorModule} from 'ng2-ckeditor';
import {SafeHtmlPipe} from '../services/sanitize.pipe';
import {AdminViewFrameComponent} from './lessons/lessons-page-tabs/lesson-content-frame/admin-view/admin-view-frame.component';
import {ExerciseAnswersListEditComponent} from './lessons/exercise-components/admin-view/exercise-answers-list-edit/exercise-answers-list-edit.component';
import {ExerciseAnswersListReadComponent} from './lessons/exercise-components/user-view/exercise-answers-list-read/exercise-answers-list-read.component';
import {ExerciseAudioEditComponent} from './lessons/exercise-components/admin-view/exercise-audio-edit/exercise-audio-edit.component';
import {ExerciseAudioReadComponent} from './lessons/exercise-components/user-view/exercise-audio-read/exercise-audio-read.component';
import {ExerciseFillSentenceEditComponent} from './lessons/exercise-components/admin-view/exercise-fill-sentence-edit/exercise-fill-sentence-edit.component';
import {UserViewFrameComponent} from './lessons/lessons-page-tabs/lesson-content-frame/user-view/user-view-frame.component';
import {ExerciseFillSentenceReadComponent} from './lessons/exercise-components/user-view/exercise-fill-sentence-read/exercise-fill-sentence-read.component';
import {ExerciseImageEditComponent} from './lessons/exercise-components/admin-view/exercise-image-edit/exercise-image-edit.component';
import {ExerciseImageReadComponent} from './lessons/exercise-components/user-view/exercise-image-read/exercise-image-read.component';
import {ExerciseListOrderEditComponent} from './lessons/exercise-components/admin-view/exercise-list-order-edit/exercise-list-order-edit.component';
import {ExerciseListOrderReadComponent} from './lessons/exercise-components/user-view/exercise-list-order-read/exercise-list-order-read.component';
import {ExerciseMatchingEditComponent} from './lessons/exercise-components/admin-view/exercise-matching-edit/exercise-matching-edit.component';
import {ExerciseMatchingReadComponent} from './lessons/exercise-components/user-view/exercise-matching-read/exercise-matching-read.component';
import {ExerciseReferenceEditComponent} from './lessons/exercise-components/admin-view/exercise-reference-edit/exercise-reference-edit.component';
import {ExerciseReferenceReadComponent} from './lessons/exercise-components/user-view/exercise-reference-read/exercise-reference-read.component';
import {ExerciseRichTextboxEditComponent} from './lessons/exercise-components/admin-view/exercise-rich-textbox-edit/exercise-rich-textbox-edit.component';
import {ExerciseRichTextboxReadComponent} from './lessons/exercise-components/user-view/exercise-rich-textbox-read/exercise-rich-textbox-read.component';
import {ExerciseTypeWordEditComponent} from './lessons/exercise-components/admin-view/exercise-type-word-edit/exercise-type-word-edit.component';
import {ExerciseTypeWordReadComponent} from './lessons/exercise-components/user-view/exercise-type-word-read/exercise-type-word-read.component';
import {ExerciseVideoEditComponent} from './lessons/exercise-components/admin-view/exercise-video-edit/exercise-video-edit.component';
import {ExerciseVideoReadComponent} from './lessons/exercise-components/user-view/exercise-video-read/exercise-video-read.component';
import {ExerciseCheckboxesEditComponent} from './lessons/exercise-components/admin-view/exercise-checkboxes-edit/exercise-checkboxes-edit.component';
import {ExerciseCheckboxesReadComponent} from './lessons/exercise-components/user-view/exercise-checkboxes-read/exercise-checkboxes-read.component';
import {ExerciseRadiogroupEditComponent} from './lessons/exercise-components/admin-view/exercise-radiogroup-edit/exercise-radiogroup-edit.component';
import {ExerciseRadiogroupReadComponent} from './lessons/exercise-components/user-view/exercise-radiogroup-read/exercise-radiogroup-read.component';
import {TeacherStartingPageComponent} from './teacher-starting-page/teacher-starting-page.component';
import {AdminNotesComponent} from './admin-notes/admin-notes.component';
import {TeacherCourseProgressComponent} from './teacher-course-progress/teacher-course-progress.component';
import {AdminScheduleComponent} from './admin-schedule/admin-schedule.component';
import {AdminLessonsCardComponent} from './admin-lessons-card/admin-lessons-card.component';
import {AdminStartingPageComponent} from './admin-starting-page/admin-starting-page.component';
import {AdminCourseProgressComponent} from './admin-course-progress/admin-course-progress.component';
import {TeacherNotesComponent} from './teacher-notes/teacher-notes.component';
import {TeacherScheduleComponent} from './teacher-schedule/teacher-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MaterialModule,
    SimpleConfirmDialogModule,
    LessonPageModule,
    AddExerciseMenuModule,
    DragulaModule,
    ImageUploadModule.forRoot(),
    AutoSizeInputModule,
    FileUploadModule,
    YoutubePlayerModule,
    NgbModule.forRoot(),
    NgDragDropModule.forRoot(),
    ImageViewerModule.forRoot(),
    LessonPageMaterialsModule,
    FullCalendarModule,
    CKEditorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [
    DashboardComponent,
    StartingPageComponent,
    ProfileComponent,
    VocabularyComponent,
    UserInfoComponent,
    NavigationComponent,
    CoursesComponent,
    TeacherLessonsComponent,
    LessonsComponent,
    AddExerciseMenuComponent,
    HometasksComponent,
    MyCoursesComponent,
    StudentsComponent,
    StudentProfileComponent,
    VocabularyCardComponent,
    HometasksCardComponent,
    SingleLessonComponent,
    HometaskComponent,
    TeacherLessonsCardComponent,
    TeacherSingleLessonComponent,
    TeacherToolbarComponent,
    TeacherNavigationComponent,
    AdminNavigationComponent,
    ToolbarComponent,
    TeachersListComponent,
    CalendarComponent,
    AdminMyCoursesComponent,
    CourseProgressComponent,
    SimpleConfirmDialogComponent,
    TeacherLessonDetailsTableComponent,
    TeachersComponent,
    CourseComponent,
    CreateCourseComponent,
    DeleteUserDialogComponent,
    DeleteCourseDialogComponent,
    DeleteTeacherDialogComponent,
    TeacherProfileComponent,
    DeleteLessonDialogComponent,
    DeleteProfileDialogComponent,
    LessonPageComponent,
    CreateCourseDialogComponent,
    CreateLessonDialogComponent,
    EditCourseDialogComponent,
    TeacherCreateComponent,
    StudentCreateComponent,
    AdminProfileComponent,
    LessonPageMaterialsComponent,
    LessonPageWordsComponent,
    LessonPageHometasksComponent,
    LessonPageTestsComponent,
    LessonContentFrameComponent,
    AdminViewFrameComponent,
    UserViewFrameComponent,
    ExerciseAnswersListEditComponent,
    ExerciseAnswersListReadComponent,
    ExerciseAudioEditComponent,
    ExerciseAudioReadComponent,
    ExerciseFillSentenceEditComponent,
    ExerciseFillSentenceReadComponent,
    ExerciseImageEditComponent,
    ExerciseImageReadComponent,
    ExerciseListOrderEditComponent,
    ExerciseListOrderReadComponent,
    ExerciseMatchingEditComponent,
    ExerciseMatchingReadComponent,
    ExerciseReferenceEditComponent,
    ExerciseReferenceReadComponent,
    ExerciseRichTextboxEditComponent,
    ExerciseRichTextboxReadComponent,
    ExerciseTypeWordEditComponent,
    ExerciseTypeWordReadComponent,
    ExerciseVideoEditComponent,
    ExerciseVideoReadComponent,
    ExerciseCheckboxesEditComponent,
    ExerciseCheckboxesReadComponent,
    ExerciseRadiogroupEditComponent,
    ExerciseRadiogroupReadComponent,
    CalendarCreateEventDialogComponent,
    CalendarEditEventDialogComponent,
    SafeHtmlPipe,
    TeacherStartingPageComponent,
    TeacherScheduleComponent,
    TeacherNotesComponent,
    TeacherCourseProgressComponent,
    AdminStartingPageComponent,
    AdminScheduleComponent,
    AdminNotesComponent,
    AdminLessonsCardComponent,
    AdminCourseProgressComponent
  ],
  entryComponents: [
    CreateCourseDialogComponent,
    CreateLessonDialogComponent,
    EditCourseDialogComponent,
    SimpleConfirmDialogComponent,
    DeleteUserDialogComponent,
    DeleteCourseDialogComponent,
    DeleteTeacherDialogComponent,
    DeleteLessonDialogComponent,
    DeleteProfileDialogComponent,
    CalendarCreateEventDialogComponent,
    CalendarEditEventDialogComponent,
  ],
  providers: [
    MusicService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'ru'},
  ]
})
export class DashboardModule {
}
