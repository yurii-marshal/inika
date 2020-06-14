import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, HostListener, Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {DomSanitizer} from '@angular/platform-browser';
import {TransitionsService} from '../../../services/transitions.service';
import {LessonsApiService} from '../../../services/api/lessons-api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CourseApiService} from '../../../services/api/course-api.service';
import {UserApiService} from '../../../services/api/user-api.service';
import {AuthService} from '../../../services/auth.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'in-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss'],
})
export class LessonPageComponent implements OnInit, AfterViewInit, OnDestroy {
  isAdminRole: boolean;
  lessonId: number;
  selectedIndex = 0;
  types = ['materials', 'wordsList', 'homeworks', 'tests'];
  isLoaded: boolean;
  isCheckAnswersFixed: boolean;
  dragItemIndex: number;

  constructor(private dragulaService: DragulaService,
              private toastr: ToastrService,
              private router: Router,
              private sanitized: DomSanitizer,
              private currentRouter: ActivatedRoute,
              public courseService: CourseApiService,
              public lessonsService: LessonsApiService,
              public authService: AuthService,
              private transitionService: TransitionsService,
              private userService: UserApiService,
              @Inject(DOCUMENT) private document: Document,
              private resolver: ComponentFactoryResolver) {
    dragulaService.drag.subscribe((args: any) => {
      // // console.log('DRAG: ', args);
      const [idName, elSource, idTarget, idSource, elTarget] = args;
      const newIndex = elTarget ? this.getElementIndex(elTarget) : idTarget.childElementCount;
      this.dragItemIndex = newIndex - 1;
    });
    dragulaService.drop.subscribe((args: any) => {
      // // console.log('DROP: ', args);
      const [idName, elSource, idTarget, idSource, elTarget] = args;
      const newIndex = elTarget ? this.getElementIndex(elTarget) : idTarget.childElementCount;
      const dragItem = this.lessonsService.lessonEntity['materials'][this.dragItemIndex];
      this.lessonsService.lessonEntity['materials'].splice(this.dragItemIndex, 1);
      this.lessonsService.lessonEntity['materials'].splice(newIndex - 1, 0, dragItem);
      // console.log(this.lessonsService.lessonEntity['materials']);
    });
    dragulaService.over.subscribe((value) => {
      // // console.log('OVER: ', value);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      // // console.log('OUT: ', value);
      this.onOut(value.slice(1));
    });
    // dragulaService.setOptions('HANDLES', {
    //     moves: (el, container, handle) => {
    //         return handle.className === 'handle';
    //     }
    // });
  }

  ngOnInit() {
    const content = document.getElementsByClassName('mat-sidenav-content');
    const header = document.getElementById('mat-header');
    const sticky = header.offsetTop;
    content[0].addEventListener('scroll', (ev) => {
      if (content[0].scrollTop > sticky) {
        header.classList.add('sticky');
        this.isCheckAnswersFixed = true;
      } else {
        header.classList.remove('sticky');
        this.isCheckAnswersFixed = false;
      }
    });

    this.currentRouter.params.subscribe((params) => {
      // // console.log(params);
      if (!params['id']) {
        this.router.navigate(['/dashboard/course-profile/', this.courseService.currentCourseId]);
      } else {
        this.lessonId = this.lessonsService.lessonEntity['id'] = Number(params['id']);
        this.getData();
      }
    });
    this.isAdminRole = false;
    // this.lessonsService.exerciseMediaData = [];
    this.transitionService.transiteLessonBuilderTrigger(this.isAdminRole);
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    // this.componentRef.destroy();
  }

  private getElementIndex(el: HTMLElement): number {
    return [].slice.call(el.parentElement.children).indexOf(el);
  }

  private getData() {
    this.isLoaded = false;
    if (this.authService.getRole() > 1) {
      this.lessonsService.getUserBlankById(this.lessonId, {}, (data) => {
        this.isLoaded = true;
      });
    } else {
      this.lessonsService.getLessonById(this.lessonId, {}, (data) => {
        this.isLoaded = true;
        this.transitionService.transiteLessonBuilderOnDataResponseTrigger(true);
      });
    }
  }

  onAdminRoleToggle() {
    if (!this.isAdminRole) {
      this.transitionService.transiteLessonBuilderTrigger(true);
      this.isAdminRole = true;
    } else {
      this.saveCurrentLesson((isError) => {
        if (isError) {
          this.isAdminRole = true;
        } else {
          this.transitionService.transiteLessonBuilderTrigger(false);
          this.isAdminRole = false;
        }
      });
    }
  }

  public saveCurrentLesson(callback?) {
    if (this.lessonsService.lessonValidation()) {
      this.lessonsService.updateLessonById(this.lessonsService.lessonEntity, (data) => {
        if (this.lessonsService.exerciseMediaData['materials'].length > 0 ||
          this.lessonsService.exerciseMediaData['homeworks'].length > 0 ||
          this.lessonsService.exerciseMediaData['tests'].length > 0
        ) {
          this.lessonsService.uploadMediaData(() => {
            callback ? callback() :
              this.toastr.success('Сохранено', this.lessonsService.lessonEntity['name']);
          });
        } else {
          callback ? callback() :
            this.toastr.success('Сохранено', this.lessonsService.lessonEntity['name']);
        }
      }, (error) => {
        // console.log(error);
      });
    } else {
      if (callback) {
        callback(true);
      }
      this.toastr.error('Пожалуйста, проверьте упражнения на наличие ответов', 'Невозможно сохранить');
    }
  }

  public getHtmlSanitized(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

  public addExercise(type) {
    // console.log(type);
  }

  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args) {
    const [e, el] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    // console.log(args);
    const [e, el] = args;
    this.addClass(e, 'ex-moved');
  }

  private onOver(args) {
    const [e, el, container] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args) {
    const [e, el, container] = args;
    this.removeClass(el, 'ex-over');
  }
}
