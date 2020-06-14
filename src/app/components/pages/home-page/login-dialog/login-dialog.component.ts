import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TransitionsService} from '../../../../services/transitions.service';
import {UserApiService} from '../../../../services/api/user-api.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../../services/auth.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'in-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  @Input() formLogin: Object = {
    email: '',
    password: ''
  };
  @Input() formPass: Object = {
    email: ''
  };
  public isDialogOpened: boolean;
  public isResetPassMode = false;
  authSub: Subscription;

  constructor(private transitionService: TransitionsService,
              private userService: UserApiService,
              private toastr: ToastrService,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.transitionService.currentLoginDialogToggle.subscribe((data) => {
      this.isDialogOpened = data;
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params['accessDenied']) {
        // Для начала авторизируйтесь  в системе
      }
    });
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  public login(thisForm: NgForm) {
    const user = {
      username: thisForm.value.email1,
      password: thisForm.value.password
    };

    this.authSub = this.auth.login(user).subscribe(
      (data) => {
        // this.userService.userData = data.data.user;
        // console.log('login success');
        // console.log(data);
      },
      error => {
        // this.toastr.error(error.error.error_description);
      }
    );

    // if (thisForm.valid) {
    // this.userService.login({
    //         email: thisForm.value.email1,
    //         password: thisForm.value.password
    //     },
    //     (data) => {
    //         this.closeDialog();
    //     },
    //     (error) => {
    //     }
    // );
    // }
  }

  public resetPassword(thisForm: NgForm) {
    if (thisForm.valid) {
      this.userService.resetPass({
          email: thisForm.value.email2
        },
        (data) => {
          this.toastr.success(
            'Новый пароль успешно отправлен на указанную эл. почту',
            'Восстановление пароля'
          );
          this.closeDialog();
        },
        (error) => {
          this.toastr.error(
            'Невозможно отправить пароль на указанный адресс',
            'Восстановление пароля'
          );
          this.closeDialog();
        }
      );
    }
  }

  public closeDialog() {
    this.isDialogOpened = false;
    this.isResetPassMode = false;
    this.transitionService.transiteLoginDialogTrigger(false);
  }
}
