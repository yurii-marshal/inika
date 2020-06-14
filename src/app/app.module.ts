import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {AuthorizationGuard} from './services/authorization.guard';
import {RequestsService} from './services/requests.service';
import {LocalstorageService} from './services/localstorage.service';
import {WebsiteModule} from './components/website.module';
import {MaterialModule} from './material/material.module';
import {TransitionsService} from './services/transitions.service';
import {UserApiService} from './services/api/user-api.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {StudentApiService} from './services/api/student-api.service';
import {Angular2FontawesomeModule} from 'angular2-fontawesome';
import {TeacherApiService} from './services/api/teacher-api.service';
import {FileUploaderService} from './services/file-uploader.service';
import {ImageViewerModule} from 'ngx-image-viewer';
import {AuthService} from './services/auth.service';
import {TokenInterceptor} from './services/token.interceptor';
import {LessonsApiService} from './services/api/lessons-api.service';
import {EventCalendarService} from './services/eventCalendar.service';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {CourseApiService} from './services/api/course-api.service';
import {RoleGuard} from './services/role.guard';
import {MatPaginatorIntl} from '@angular/material';
import {getRussianPaginatorIntl} from './russian-paginator-intl';
import {FontAwesomeIcon} from './common/socials/socials.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    WebsiteModule,
    DashboardModule,
    AppRoutingModule,
    MaterialModule,
    ToastrModule.forRoot(),
    NgxPageScrollModule,
    Angular2FontawesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getRussianPaginatorIntl() },
    HttpClientModule,
    AuthorizationGuard,
    RoleGuard,
    RequestsService,
    UserApiService,
    StudentApiService,
    CourseApiService,
    LocalstorageService,
    TransitionsService,
    FileUploaderService,
    TeacherApiService,
    LessonsApiService,
    AuthService,
    EventCalendarService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
