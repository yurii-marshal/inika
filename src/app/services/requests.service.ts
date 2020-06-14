import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../app-settings';

@Injectable()
export class RequestsService {
  currentRequests: Array<any> = [];

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              public router: Router) {
  }

  public get(suffix, params, responseCallback, completeCallback, errorCallback) {
    this.currentRequests.push(
      this.http.get(AppSettings.BASE_URL + suffix + this.handleRequestUrlProps(params)).subscribe(
        (data) => {
          responseCallback(data);
        },
        (err) => {
          this.errorHandler(err);
          errorCallback(err);
        },
        () => {
          completeCallback();
        }
      )
    );
  }

  public post(suffix, requestBody, responseCallback, completeCallback, errorCallback) {
    this.currentRequests.push(
      this.http.post(AppSettings.BASE_URL + suffix, requestBody).subscribe(
        (data) => {
          responseCallback(data);
        },
        (err) => {
          this.errorHandler(err);
          errorCallback(err);
        },
        () => {
          completeCallback();
        }
      )
    );
  }

  public put(suffix, requestBody, responseCallback, completeCallback, errorCallback) {
    this.currentRequests.push(
      this.http.put(AppSettings.BASE_URL + suffix, requestBody).subscribe(
        (data) => {
          responseCallback(data);
        },
        (err) => {
          this.errorHandler(err);
          errorCallback(err);
        },
        () => {
          completeCallback();
        }
      )
    );
  }

  public patch(suffix, requestBody, responseCallback, completeCallback, errorCallback) {
    this.currentRequests.push(
      this.http.patch(AppSettings.BASE_URL + suffix, requestBody).subscribe(
        (data) => {
          responseCallback(data);
        },
        (err) => {
          this.errorHandler(err);
          errorCallback(err);
        },
        () => {
          completeCallback();
        }
      )
    );
  }

  public delete(suffix, params, responseCallback, completeCallback, errorCallback) {
    this.currentRequests.push(
      this.http.delete(AppSettings.BASE_URL + suffix + this.handleRequestUrlProps(params)).subscribe(
        (data) => {
          responseCallback(data);
        },
        (err) => {
          this.errorHandler(err);
          errorCallback(err);
        },
        () => {
          completeCallback();
        }
      )
    );
  }

  public unsubscribeRequests() {
    const that = this;
    setTimeout(function () {
      that.currentRequests.forEach(function (item) {
        item.unsubscribe();
      });
      that.currentRequests = [];
    }, 1000);
  }

  private errorHandler(error) {
    // console.log('ERROR: ', error.status, error.statusText, error);
    if (error.status === 401) {
      this.toastr.error('Please, log in again', 'Unauthorized');
      // this.oidcSecurityService.logoff();
      this.router.navigateByUrl('');
    } else if (error.status === 400) {
      this.toastr.error(error.status + ' ' + error.statusText,
        'Data Error', {
          disableTimeOut: true,
          closeButton: true
        });
    } else {
      this.toastr.error('Ошибка сервера. Обратитесь к администратору', 'System Error', {
        disableTimeOut: false,
        closeButton: true
      });
    }
  }

  private handleRequestUrlProps(obj: Object): string {
    let str = '';
    for (const prop in obj) {
      if (!obj.hasOwnProperty(prop)) {
        continue;
      }
      if (obj[prop] === '') {
        continue;
      }
      if (prop === 'order') {
        if (obj[prop] !== undefined) {
          str += '&' + (obj[prop]['order'] === 'ASC' ? 'orderBy' : 'orderByDesc') + '=' + obj[prop]['prop'];
        }
        continue;
      }
      if (prop === 'status') {
        for (const status in obj[prop]) {
          if (!obj[prop].hasOwnProperty(status)) {
            continue;
          }
          if (obj[prop][status] === true) {
            str += '&status=' + status;
          }
        }
        continue;
      }
      if (prop === 'filterGroup') {
        for (const filter in obj[prop]) {
          if (!obj[prop].hasOwnProperty(filter)) {
            continue;
          }
          if (obj[prop][filter]) {
            str += `&${filter}=` + obj[prop][filter];
          }
        }
        continue;
      }
      str += '&' + prop + '=' + obj[prop];
    }
    if (str.length > 0) {
      str = str.slice(1, str.length);
      str = '?' + str;
    }
    return str;
  }
}
