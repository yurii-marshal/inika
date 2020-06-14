import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Course} from './course/Course';
import {AppSettings} from '../../app-settings';

@Injectable()
export class CoursesService {

    private coursesUrl = AppSettings.BASE_URL + '/courses';

    constructor(private http: Http) {
    }

    public getAll(): Observable<Course[]> {
        return this.http.get(this.coursesUrl)
            .map((response: Response) => {
                return response.json().data;
            })
            .catch((response: Response) => {
                return Observable.throw(new Error(response.json().error));
            });
    }

}
