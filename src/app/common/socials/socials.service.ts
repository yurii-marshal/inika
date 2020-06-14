import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Http, Response} from '@angular/http';
import {AppSettings} from '../../app-settings';

export interface FontAwesomeIcon {
    name: string;
    border: boolean;
}

export interface SimpleLineIcon {
    class: string;
}

export interface Icon<T> {
    type: string;
    data: T;
}

export interface SocialNetwork {
    url: string;
    text: string;
    icon: Icon<FontAwesomeIcon | SimpleLineIcon>;
}

// icon: {data: {border: false, name: "facebook"}, type: "font-awesome"}
// data: {border: false, name: "facebook"}
// border: false
// name: "facebook"
// type: "font-awesome"
// id: 1
// text: "Facebook"

@Injectable()
export class SocialsService {

    private socialsUrl = AppSettings.BASE_URL + '/socials';

    constructor(private http: Http) {
    }

    public getSocials(): Observable<SocialNetwork[]> {
        return this.http.get(this.socialsUrl)
            .map((response: Response) => {
          if (response.json().status === 'OK') {
                    return response.json().data;
                }
            })
            .catch((response: Response) => {
                return Observable.throw(new Error(response.json().error));
            });
    }

}
