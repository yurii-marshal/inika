import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {LocalstorageService} from './localstorage.service';

@Injectable()
export class TransitionsService {
  // merchant: Object = null;
  // idUserForTransitions: number = null;
  // tabForReport: number = null;
  // RTLToggleEmitter = new BehaviorSubject<boolean>(false);
  LoginDialogEmitter = new BehaviorSubject<boolean>(false);
  LessonBuilderEmitter = new BehaviorSubject<boolean>(false);
  LessonBuilderDataEmitter = new BehaviorSubject<boolean>(false);
  currentLoginDialogToggle = this.LoginDialogEmitter.asObservable();
  currentLessonBuilderToggle = this.LessonBuilderEmitter.asObservable();
  currentLessonBuilderOnDataResponse = this.LessonBuilderDataEmitter.asObservable();
  // currentLoadingProgress = this.LoadingProgressEmitter.asObservable();
  // previousUrl: string = '';
  // currentUrl: string = '';

  constructor(router: Router,
              public localstorageService: LocalstorageService) {
    // router.events
    //     .filter(event => event instanceof NavigationEnd)
    //     .subscribe(e => {
    //         this.setPrevUrl(this.currentUrl);
    //         if (e) this.currentUrl = e['url'];
    //     });
  }

  // private setPrevUrl(url: string) {
  //     this.localstorageService.write('previousUrl', url);
  // }

  // public transiteRTLToggle(data: boolean) {
  //     this.RTLToggleEmitter.next(data);
  // }

  public transiteLoginDialogTrigger(data: boolean) {
    this.LoginDialogEmitter.next(data);
  }

  public transiteLessonBuilderTrigger(data: boolean) {
    this.LessonBuilderEmitter.next(data);
  }

  public transiteLessonBuilderOnDataResponseTrigger(data: boolean) {
    this.LessonBuilderDataEmitter.next(data);
  }
}
