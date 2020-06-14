import {Injectable} from '@angular/core';
import {RequestsService} from '../requests.service';
import {Teacher} from '../../dashboard/teachers/teacher.model';
import {Student} from '../../dashboard/students/student.model';
import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Course} from '../../Models/course.model';
import {AppSettings} from '../../app-settings';

@Injectable()
export class TeacherApiService {
  // ***********************************
  // PROPERTIES
  // ***********************************
  public editMode = false;
  public emailUsed = new Subject<string>();
  public createUser = false;
  public defaultImage = '../../../../assets/images/defaultAvatar.png';
  public admin;
  public courseId: any;
  public selectedTabIndex = 0;
  private teachers: any[] = [];
  private students: any[] = [];
  private courses: any[] = [];
  private activeCourses: any[] = [];
  private lessons: any = [];
  private lessonsUpdated = new Subject<any>();
  private adminUpdated = new Subject<any>();
  private studentsUpdated = new Subject<any[]>();
  private teachersUpdated = new Subject<any[]>();
  private coursesUpdated = new Subject<any[]>();
  private activeCoursesUpdated = new Subject<any[]>();

  public isTeacherEditMode: boolean;


  // ***********************************
  // CONSTRUCTOR
  // ***********************************
  constructor(private http: HttpClient,
              private router: Router) {
  }

  disableForm = (form: any) => {
    if (form.get('teachersInputField')) {
      form.get('teachersInputField').disable();
    }
    if (form.get('studentsInputField')) {
      form.get('studentsInputField').disable();
    }
    if (form.get('coursesInputField')) {
      form.get('coursesInputField').disable();
    }
    if (form.get('password')) {
      form.get('password').disable();
    }
    form.get('username').disable();
    form.get('address').disable();
    form.get('activity').disable();
    form.get('phone').disable();
    form.get('skype').disable();
    form.get('email').disable();
  };

  enableForm = (form: any) => {
    if (form.get('teachersInputField')) {
      form.get('teachersInputField').enable();
    }
    if (form.get('studentsInputField')) {
      form.get('studentsInputField').enable();
    }
    if (form.get('coursesInputField')) {
      form.get('coursesInputField').enable();
    }
    if (form.get('password')) {
      form.get('password').enable();
    }
    form.get('username').enable();
    form.get('address').enable();
    form.get('activity').enable();
    form.get('phone').enable();
    form.get('skype').enable();
    form.get('email').enable();
  };


  // ***********************************
  // GET ALL STUDENTS
  // ***********************************
  getStudents = (data) => {
    data['filter'] = {role_id: 3};
    data['paginationCount'] = 9999;
    this.http.post(AppSettings.BASE_URL + '/users/list', data)
      .subscribe((responseData: any) => {

        const studentsList = responseData.data.users_list;

        this.students = studentsList;
        this.studentsUpdated.next([...this.students]);
      });
  };

  getStudentsUpdateListener = () => {
    return this.studentsUpdated.asObservable();
  };

  // ***********************************
  // GET ALL TEACHERS
  // ***********************************
  getTeachers = (data) => {
    data['filter'] = {role_id: 2};
    data['paginationCount'] = 9999;
    this.http.post(AppSettings.BASE_URL + '/users/list', data)
      .subscribe((responseData: any) => {
        const users_list = responseData.data.users_list;
        this.teachers = users_list;
        this.teachersUpdated.next([...this.teachers]);
      });
  };

  getTeachersUpdateListener = () => {
    return this.teachersUpdated.asObservable();
  };

  // ***********************************
  // GET  A SINGLE USER
  // ***********************************
  getUser = (id: string) => {
    // return {...this.teachers.find(t => t.id === id)};
    return this.http.get<any>(AppSettings.BASE_URL + '/users/' + id);
  };


  // ***********************************
  // UPDATE USER
  // ***********************************
  updateUser = (user: any, callback, errCallback) => {
    // // console.log(user);
    const userData = new FormData();
    const roleId = user.role_id;
    userData.append('id', user.id);
    userData.append('username', user.username);
    userData.append('address', user.address || '');
    userData.append('activity', user.activity || '');
    userData.append('skype', user.skype || '');
    userData.append('email', user.email);
    userData.append('phone', user.phone || '');
    userData.append('role_id', user.role_id);
    if (user.password && user.password.length >= 8) {
      userData.append('password', user.password);
    }
    if (user.lessons) {
      userData.append('lessons', user.lessons.join());
    }
    if (this.router.url !== '/dashboard/profile') {
      if (roleId === '2') {
        userData.append('users', user.students.join());
      }
      if (roleId === '3') {
        userData.append('users', user.teachers.join());
      }
      if (roleId !== '1') {
        userData.append('courses', user.courses.join());
      }
    }
    if (user.file !== null) {
      userData.append('file', user.file, user.username);
    }
    // console.log(userData);
    this.http
      .put(AppSettings.BASE_URL + '/users/' + user.id, userData)
      .subscribe((responseData) => {
        const userResp: any = {
          id: responseData['data'].user.id,
          username: responseData['data'].user.username,
          address: responseData['data'].user.address,
          activity: responseData['data'].user.activity,
          phone: responseData['data'].user.phone,
          skype: responseData['data'].user.skype,
          email: responseData['data'].user.email,
          courses: responseData['data'].user.courses,
          students: responseData['data'].user.students,
          teachers: responseData['data'].user.teachers,
          lessons: responseData['data'].user.lessons,
          avatar_img: responseData['data'].user.avatar_img,
          avatar_thumb_url: responseData['data'].user.avatar_thumb_url,
          avatar_content_id: responseData['data'].user.avatar_content_id,
          permissions: responseData['data'].user.permissions,
          role_id: responseData['data'].user.role_id,
          file: responseData['data'].user.file,
          password: responseData['data'].user.password,
        };


        if (userResp.role_id === 1) {
          this.admin = userResp;
          this.adminUpdated.next({...this.admin});
        }

        if (userResp.role_id === 2) {
          const updatedTeachers = [...this.teachers];
          const oldTeacherIndex = updatedTeachers.findIndex(teacher1 => {
            return teacher1.id === userResp.id;
          });
          updatedTeachers[oldTeacherIndex] = userResp;
          this.teachers = updatedTeachers;
          this.teachersUpdated.next([...this.teachers]);
        }

        if (userResp.role_id === 3) {
          const updatedStudents = [...this.students];
          const oldStudentIndex = updatedStudents.findIndex(student => {
            return student.id === userResp.id;
          });
          updatedStudents[oldStudentIndex] = userResp;
          this.students = updatedStudents;
          this.studentsUpdated.next([...this.students]);
        }

        callback();
      }, (error) => {
        const errorResp = error.error.error_description;
        errCallback(errorResp);
      });
  };

  adminUpdatedListener() {
    return this.adminUpdated.asObservable();
  }

  // ***********************************
  //  CREATE USER
  // ***********************************
  createNewUser = (user: any, callback, errCallback) => {
    const roleId = user.role_id;
    const userData = new FormData();

    userData.append('username', user.username);
    userData.append('address', user.address || '');
    userData.append('activity', user.activity || '');
    userData.append('skype', user.skype || '');
    userData.append('email', user.email);
    userData.append('phone', user.phone || '');
    userData.append('role_id', user.role_id);
    if (user.lessons) {
      userData.append('lessons', user.lessons.join());
    }
    if (roleId === '2') {
      userData.append('users', user.students.join());
    }
    if (roleId === '3') {
      userData.append('users', user.teachers.join());
    }
    userData.append('courses', user.courses.join(','));
    if (user.file['name']) {
      userData.append('file', user.file, user.username);
    }

    this.http
      .post(AppSettings.BASE_URL + '/users/', userData)
      .subscribe((responseData) => {
          this.emailUsed.next(null);
          const userResp: any = {
            id: responseData['data'].user.id,
            username: responseData['data'].user.username,
            address: responseData['data'].user.address,
            activity: responseData['data'].user.activity,
            phone: responseData['data'].user.phone,
            skype: responseData['data'].user.skype,
            email: responseData['data'].user.email,
            courses: responseData['data'].user.courses,
            students: responseData['data'].user.students,
            teachers: responseData['data'].user.teachers,
            lessons: responseData['data'].user.lessons,
            avatar_img: responseData['data'].user.avatar_img,
            avatar_thumb_url: responseData['data'].user.avatar_thumb_url,
            avatar_content_id: responseData['data'].user.avatar_content_id,
            permissions: responseData['data'].user.permissions,
            role_id: responseData['data'].user.role_id,
            file: responseData['data'].user.file
          };
          if (roleId === 2) {
            this.teachers.push(userResp);
            this.teachersUpdated.next([...this.teachers]);
          }

          if (roleId === 3) {
            this.students.push(userResp);
            this.studentsUpdated.next([...this.students]);
          }

          if (userResp.role_id === 3) {
            this.router.navigate(['/dashboard/students/edit', userResp.id]);
          }
          if (userResp.role_id === 2) {
            this.router.navigate(['/dashboard/teachers/edit', userResp.id]);
          }
          callback(responseData);
          // this.router.navigate(['/teachers']);
        },
        (error) => {
          const errorResp = error.error.error_description;
          this.emailUsed.next(errorResp);
          errCallback(errorResp);
        });
  };
  isEmailUsed = () => {
    return this.emailUsed.asObservable();
  };

  // ***********************************
  // DELETE A USER
  // ***********************************
  deleteTeacher = (user: any) => {
    const userId = user.id;
    const roleId = user.role_id;

    this.http.delete(AppSettings.BASE_URL + '/users/' + userId)
      .subscribe((responseData) => {
        if (roleId === 2) {
          this.teachers = this.teachers.filter(teacher => teacher.id !== userId);
          this.teachersUpdated.next([...this.teachers]);
        }
        if (roleId === 3) {
          this.students = this.students.filter(teacher => teacher.id !== userId);
          this.studentsUpdated.next([...this.students]);
        }
      });
  };


  // ***********************************
  // GET COURSES
  // ***********************************
  getCourses = () => {
    this.http.post(AppSettings.BASE_URL + '/courses/list', {
      paginationCount: 9999
    })
      .subscribe((responseData: any) => {
        this.courses = responseData.data.course_list.map((course) => {
          return {
            id: course.id,
            name: course.name,
            students: course.students,
            teachers: course.teachers,
            is_active: course.is_active
          };
        });
        this.coursesUpdated.next([...this.courses]);
      });
  };

  getActiveCourses = () => {
    this.http.post(AppSettings.BASE_URL + '/courses/list', {active: 1})
      .subscribe((responseData: any) => {
        this.activeCourses = responseData.data.course_list.map((course) => {
          return {
            id: course.id,
            name: course.name,
            students: course.students,
            teachers: course.teachers,
            is_active: course.is_active
          };
        });
        this.activeCoursesUpdated.next([...this.activeCourses]);
      });
  };

  getCoursesUpdatedListener() {
    return this.coursesUpdated.asObservable();
  }

  getActiveCoursesUpdatedListener() {
    return this.activeCoursesUpdated.asObservable();
  }

  // ***********************************
  // ADD COURSE
  // ***********************************
  addCourse = (course: Course, callback) => {
    this.http.post(AppSettings.BASE_URL + '/courses/', course)
      .subscribe((responseData) => {
        this.courses.push({name: course.name});
        this.coursesUpdated.next([...this.courses]);
        callback();
      });
  };

  // ***********************************
  // DELETE COURSE
  // ***********************************
  deleteCourse = (course: any) => {
    const id = course.course_id;
    this.http.delete(AppSettings.BASE_URL + '/courses/' + id)
      .subscribe((responseData) => {
        this.courses = this.courses.filter(c => {
          return c.id !== id;
        });
        this.coursesUpdated.next([...this.courses]);
      });
  };


  // ***********************************
  // UPDATE COURSE
  // ***********************************
  updateCourse = (course: any) => {
    const id = course.course_id;
    this.http.put(AppSettings.BASE_URL + `/courses/${id}`, {name: course.name, is_active: course.is_active})
      .subscribe((responseData) => {
        this.getCourses();
      });
  };


  // ***********************************
  //        GET LESSONS
  // ***********************************
  getLessons = (id) => {
    this.http.post(AppSettings.BASE_URL + '/lessons/list', {course_id: id, paginationCount: 9999})
      .subscribe((responseData: any) => {
        const lessons_list = responseData.data.lesson_list;
        this.lessons = lessons_list;
        this.lessonsUpdated.next([...this.lessons]);
      });
  };

  getLessonsUpdatedListener = () => {
    return this.lessonsUpdated.asObservable();
  };

  // ***********************************
  //        CREATE LESSON
  // ***********************************
  createLesson(lesson) {
    this.http.post(AppSettings.BASE_URL + '/lessons/', {
      course_id: lesson.courseId,
      name: lesson.lessonName,
      description: lesson.description
    })
      .subscribe(() => {
          this.getLessons(lesson.courseId);
        },
        (error) => {
        });
  }

  // ***********************************
  //        UPDATE LESSON
  // ***********************************
  updateLesson = (inputLesson) => {
    const lesson = {
      id: inputLesson.id,
      courseId: inputLesson.courseId,
      name: inputLesson.name,
      keywords: inputLesson.keywords
    };
    this.http.put(AppSettings.BASE_URL + `/lessons/${lesson.id}`, {
      courseId: lesson.courseId,
      name: lesson.name,
      description: lesson.keywords
    })
      .subscribe((responseData) => {
          this.getLessons(this.courseId);
        },
        (error) => {
          // console.log(error);
        });
  };

  // ***********************************
  //        DELETE LESSON
  // ***********************************
  deleteLesson = (id) => {
    this.http.delete(AppSettings.BASE_URL + `/lessons/${id}`)
      .subscribe(() => {
        this.lessons = this.lessons.filter((lesson) => {
          return lesson.id !== id;
        });
        this.lessonsUpdated.next(this.lessons);
      });
  };
}
