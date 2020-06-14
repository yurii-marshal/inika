import {environment} from '../environments/environment';
import {HttpHeaders} from '@angular/common/http';

export class AppSettings {
  public static BASE_URL = environment.production ?
    'http://inika-school.com/api/v1' :
    'http://class-schedule-dev24.dev2b.net/api/v1';

  public static HttpOptions = {
    headers: new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json'
    })
  };
}
