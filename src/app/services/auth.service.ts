import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../app-settings';

@Injectable()
export class AuthService implements OnInit {
  private access_token = null;
  private role: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private http: HttpClient) {
    this.role = localStorage.getItem('in-level') || null;
  }

  ngOnInit() {
  }

  login = (user: any): Observable<{ userData: any }> => {
    // console.log('%c login auth login user: ', 'background: #444; color: #ff8533');
    return this.http.post<{ userData: any }>(AppSettings.BASE_URL + '/auth/login', user)
      .pipe(
        tap(
          (userData) => {
            this.role = userData['data']['user']['role_id'].toString();
            localStorage.setItem('in-level', this.role);
            const {access_token} = userData['data'].user;
            localStorage.setItem('auth-token', access_token);
            this.setToken(access_token);
            this.router.navigate(['dashboard/courses']);
          },
          (error) => {
            // console.log(error);
            this.toastr.error('Неверно введены данные для входа', 'Ошибка');
          }
        )
      );
  };

  setToken(token: string) {
    this.access_token = 'Bearer ' + token;
  }

  getToken(): string {
    return this.access_token;
  }

  isAuthenticated(): boolean {
    return !!this.access_token;
  }

  autoAuthUser = () => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      return;
    }
    return {
      token: token
    };
  };

  getRole() {
    return Number(this.role || localStorage.getItem('in-level'));
  }

  checkRole(route) {
    if (this.role || localStorage.getItem('in-level')) {
      return route.data.accessLevels.indexOf(this.role || localStorage.getItem('in-level')) !== 1;
    } else {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
