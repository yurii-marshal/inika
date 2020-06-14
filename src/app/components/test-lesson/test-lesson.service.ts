import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {TestLessonFormBig} from '../test-lesson-form-big/test-lesson-form-big';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {TestLessonFormSmall} from '../test-lesson-form-small/test-lesson-form-small';
import {AppSettings} from '../../app-settings';

@Injectable()
export class TestLessonService {
  private testLessonsUrl = AppSettings.BASE_URL + '/test-lessons';

  constructor(private http: Http) {
  }

  public createTestLessonRequest(info: TestLessonFormBig | TestLessonFormSmall): Observable<string> {
    return this.http
      .post(this.testLessonsUrl, info)
      .map((response: Response) => {
        return response.json().message;
      })
      .catch((response: Response) => {
        return Observable.throw(response.json().error);
      });
  }
}
