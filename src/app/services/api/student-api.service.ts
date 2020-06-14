import {Injectable} from '@angular/core';
import {RequestsService} from '../requests.service';
import {EventCalendarService} from '../eventCalendar.service';

@Injectable()
export class StudentApiService {
  public isStudentEditMode: boolean;

  constructor(public httpService: RequestsService,
              private calendarService: EventCalendarService) {
    this.isStudentEditMode = false;
  }

  public getStudentsList(params, response, completeCallback) {
    this.httpService.get(
      `/students`,
      params,
      (data) => {
        response(data);
      },
      () => completeCallback,
      () => null
    );
  }

  public updateStudent(requestData, response, error) {
    this.httpService.post(
      `/update-student`,
      requestData,
      (data) => {
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }

  public deleteStudent(requestData, response, error) {
    this.httpService.delete(
      `/delete-student`,
      requestData,
      (data) => {
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }

  public createCalendarEvent(requestData, response, error) {
    this.httpService.post(
      `/user-calendar/`,
      requestData,
      (data) => {
        this.calendarService.setEventsProps(data, requestData['role_id']);
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }

  public editCalendarEvent(requestData, response, error) {
    this.httpService.put(
      `/user-calendar/${requestData['id']}`,
      requestData,
      (data) => {
        this.calendarService.setEventsProps(data, requestData['role_id']);
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }

  public deleteCalendarEvent(id, requestData, role_id, response, error) {
    this.httpService.delete(
      `/user-calendar/${id}`,
      requestData,
      (data) => {
        this.calendarService.setEventsProps(data, role_id);
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }

  public editLessonCount(requestData, response, error) {
    this.httpService.post(
      `/users/paid-lessons`,
      requestData,
      (data) => {
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }
}
