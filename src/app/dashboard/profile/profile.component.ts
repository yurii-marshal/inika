import {Component, Input, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators, NgModel} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Observable} from 'rxjs/Observable';
import {trigger, state, style} from '@angular/animations';
import {MatSelect, MatDialog} from '@angular/material';
import {DeleteProfileDialogComponent} from './delete-profile-dialog/delete-profile-dialog.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'in-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  public userData: { userAvatarUrl: string; username: string; courseLevel: string; teacher: string };
  public isEditMode: boolean;
  public selectedTabIndex: any;
  private initFormProfile: any;

  @ViewChild('password') password;

  @Input()
  formProfile: Object = {
    country: '',
    profession: '',
    profileEmail: '',
    skype: '',
    phone: '',
    userName: '',
    submitted: '',
    password: ''
  };

  constructor(public authService: AuthService,
              private activeRouter: ActivatedRoute,
              private router: Router,
              private deleteProfileDialog: MatDialog) {
    this.isEditMode = false;
  }

  ngOnInit() {
    this.userData = {
      userAvatarUrl: '../../../assets/images/user.png',
      username: 'Alina Kozerod',
      courseLevel: 'Upper-Intermediate Course',
      teacher: 'Оксана Кулинич'
    };
    this.formProfile = {
      country: 'Львов, Украина',
      profession: 'Бухгалтер',
      profileEmail: 'aliconnors@example.com',
      skype: 'alina_kozerod',
      phone: '+38099123245',
      userName: 'Alina Kozerod',
      submitted: '',
      password: 'tytyytytytyt'
    };
    this.initFormProfile = {...this.formProfile};
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  onImageAvatarSelected = (event) => {
    if (event.target.files && event.target.files[0]) {
      const obj = new FileReader();
      obj.onload = (data: any) => {
        this.userData.userAvatarUrl = data.target.result;
      };
      obj.readAsDataURL(event.target.files[0]);
    }
  };

  public getChangedDate() {
  }

  public deleteProfile = () => {
    const dialogRef = this.deleteProfileDialog.open(DeleteProfileDialogComponent, {
      data: {
        name: 'Шевченко Марина'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result) {
        this.router.navigate(['/dashboard/students']);
      }
    });
  };

  public onPhoneInput = (event: any) => {
    const pattern = /^[0-9()\-+]*$/;
    if (event.key !== 'Backspace' && event.key !== 'Delete') {
      if (
        event.target.value.length > 50 ||
        !pattern.test(String.fromCharCode(event.charCode)) ||
        (event.key === ' ' && event.target.value[event.target.value.length - 1] === ' ')
      ) {
        event.preventDefault();
      }
    }
  };

  public saveProfileInfo(form: NgForm) {
    // console.log('form: ');
    // console.log(form);
    // console.log('formProfile:');
    // console.log(this.formProfile);

    this.isEditMode = false;
  }

  public cancelEdit() {
    this.isEditMode = false;
    this.formProfile = this.initFormProfile;
  }
}
