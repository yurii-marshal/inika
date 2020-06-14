import {Injectable} from '@angular/core';
import {RequestsService} from '../requests.service';

@Injectable()
export class UserApiService {
  public userData: any;

  constructor(public httpService: RequestsService) {
  }

  public login(requestData, response, error) {
    this.httpService.post(
      `/login`,
      requestData,
      (data) => {
        // console.log(data);
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }

  public resetPass(requestData, response, error) {
    this.httpService.post(
      `/users/reset-password`,
      requestData,
      (data) => {
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }

  public getUserData(response, errorCallback) {
    this.httpService.get(
      `/profile`,
      {},
      (data) => {
        this.userData = data;
        response(data);
      },
      () => null,
      (err) => errorCallback(err)
    );
  }

  public logout(response) {
    this.httpService.get(
      `/logout`,
      {},
      (data) => {
        response(data);
      },
      () => {
      },
      () => null
    );
  }
}
