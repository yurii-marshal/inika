import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Options} from 'fullcalendar';
import {RequestsService} from './requests.service';

@Injectable()
export class EventCalendarService {
  public statusList = [];
  public calendarOptions = {
    editable: true,
    eventLimit: false,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listMonth'
    },
    events: [],
    allDaySlot: false,
    slotLabelFormat: 'HH:mm',
    timeFormat: 'HH:mm',
    locale: 'ru',
    buttonText: {
      today: 'Сегодня',
      month: 'Месяц',
      week: 'Неделя',
      day: 'День',
      list: 'Список'
    },
  };
  public eventColorsList = {
    1: '#979797',
    2: '#b40002',
    3: '#cdbe1a',
    4: '#00aa4f',
  };

  constructor(private httpService: RequestsService) {
    this.getStatusesList(() => {
    });
  }

  public getStatusesList(callback) {
    this.httpService.post(
      `/status/list`,
      {},
      (data) => {
        // console.log(data);
        this.statusList = data.data['rb_list'];
        callback(data);
      },
      () => null,
      () => null
    );
  }

  public getCalendarEvents(requestData, role_id, callback, errorCallback) {
    this.httpService.post(
      `/user-calendar/list`,
      requestData,
      (data) => {
        // console.log(data);
        this.setEventsProps(data, role_id);
        callback(data.data);
      },
      () => null,
      (error) => errorCallback(error)
    );
  }

  public setEventsProps(data, role_id) {
    data.data['calendar_list'].forEach((item) => {
      item['color'] = this.eventColorsList[item.status_id];
      if (role_id === 3) {
        item['title'] = item['teacher'];
      } else if (role_id === 2) {
        item['title'] = item['student'];
      } else {
        item['title'] = item['id'];
      }
      item['start'] = new Date(item['date']);
      item['end'] = new Date(item['date']);
      item['start'].setHours(item['time_from'].split(':')[0]);
      item['start'].setMinutes(item['time_from'].split(':')[1]);
      item['end'].setHours(item['time_to'].split(':')[0]);
      item['end'].setMinutes(item['time_to'].split(':')[1]);
      item['color'] = this.eventColorsList[item.status_id];
    });
    this.calendarOptions.events = data.data['calendar_list'];
  }

  public convertTimeAMto24(val) {
    let hours = Number(val.match(/^(\d+)/)[1]);
    const minutes = Number(val.match(/:(\d+)/)[1]);
    const AMPM = val.match(/\s(.*)$/)[1];
    if (AMPM === 'PM' && hours < 12) {
      hours = hours + 12;
    }
    if (AMPM === 'AM' && hours === 12) {
      hours = hours - 12;
    }
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) {
      sHours = '0' + sHours;
    }
    if (minutes < 10) {
      sMinutes = '0' + sMinutes;
    }
    return (sHours + ':' + sMinutes);
  }

  public dayClick(event, callback, c) {
    // // console.log(event);
    callback(event, c);
  }

  public eventClick(ev) {
    // console.log(ev);
  }

  public updateEvent(ev) {
    // console.log(ev);
  }

  public clickButton(ev) {
    // console.log(ev);
  }

  public getEvents(): Observable<any> {
    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    const data: any = [
      {
        title: 'All Day Event',
        start: yearMonth + '-01'
      },
      {
        title: 'Long Event',
        start: yearMonth + '-07',
        end: yearMonth + '-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: yearMonth + '-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2018-08-15',
        end: '2018-08-18'
      },
      {
        title: 'Conference!!',
        start: yearMonth + '-11',
        end: yearMonth + '-13'
      },
      {
        title: 'Meeting',
        start: yearMonth + '-12T10:30:00',
        end: yearMonth + '-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: yearMonth + '-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: yearMonth + '-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: yearMonth + '-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: yearMonth + '-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: yearMonth + '-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: yearMonth + '-28'
      }
    ];

    return Observable.of(data);
  }
}
