import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TeacherApiService} from '../../services/api/teacher-api.service';
import {Subscription} from 'rxjs/Subscription';
import {MatDialog} from '@angular/material';
import {UserApiService} from '../../services/api/user-api.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth.service';
import {StudentApiService} from '../../services/api/student-api.service';

@Component({
  selector: 'in-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  form: FormGroup;
  relateList: Array<any>;
  selectedTabIndex = 1;
  imagePreview: string;
  isEditMode: boolean;
  admin: any;
  createUser = false;
  adminSub: Subscription;
  // emailUsed = this.teacherService.isEmailUsed();
  emailUsed: any;

  constructor(public route: ActivatedRoute,
              public authService: AuthService,
              private deleteTeacherDialog: MatDialog,
              private toastr: ToastrService,
              private userService: UserApiService,
              private studentService: StudentApiService,
              private teacherService: TeacherApiService,
              private router: Router) {
  }

  ngOnInit() {
    // initial this.form settings
    // this.emailUsed.subscribe(val => this.isEmailUsed = val);
    this.getUserInfo();
    this.form = new FormGroup({
      teachersInputField: new FormControl(),
      username: new FormControl(
        null,
        {
          validators: [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(1)
          ]
        }),
      address: new FormControl(
        null,
        {
          validators: [
            Validators.maxLength(50)
          ]
        }
      ),
      activity: new FormControl(
        null,
        {
          validators: [
            Validators.maxLength(50)
          ]
        }
      ),
      phone: new FormControl(
        null,
        {
          validators: [
            Validators.maxLength(50)
          ]
        }
      ),
      skype: new FormControl(
        null,
        {
          validators: [
            Validators.maxLength(50)
          ]
        }
      ),
      email: new FormControl(
        null,
        {
          validators: [
            Validators.maxLength(50),
            Validators.email,
            Validators.required
          ]
        }
      ),
      password: new FormControl(
        null,
        {
          validators: [
            Validators.minLength(5),
            Validators.maxLength(50)
          ]
        }
      ),
      avatar_img: new FormControl(
        null,
        {})
    });
    this.disableForm();
  };

  ngAfterViewInit() {
  }

  private getUserInfo() {
    this.emailUsed = false;
    this.teacherService.getUser('me')
      .subscribe((adminData) => {
        // console.log(adminData);
        this.admin = adminData['data'].user;
        this.imagePreview = this.admin.avatar_url ? this.admin.avatar_url : '/assets/images/defaultAvatar.png';

        this.form.patchValue({
          username: this.admin.username,
          address: this.admin.address,
          activity: this.admin.activity,
          phone: this.admin.phone,
          skype: this.admin.skype,
          email: this.admin.email,
          avatar_img: this.admin.avatar_url
        });
      });
    switch (this.authService.getRole()) {
      case 2:
        this.teacherService.getStudents({});
        this.teacherService.getStudentsUpdateListener()
          .subscribe((userData) => {
            this.relateList = userData.map((item) => {
              return {id: item.id, name: item.username};
            });
          });
        break;
      case 3:
        this.teacherService.getTeachers({});
        this.teacherService.getTeachersUpdateListener()
          .subscribe((userData) => {
            this.relateList = userData.map((item) => {
              return {id: item.id, name: item.username};
            });
          });
        break;
    }
  }

  cancelEdit() {
    this.getUserInfo();
    this.disableForm();
    // this.router.navigate(['/dashboard/teachers']);
  }

  onUpdateAdmin() {
    if (!this.form.invalid) {
      const admin = {
        id: 'me',
        username: this.form.value.username,
        address: this.form.value.address || '',
        activity: this.form.value.activity || '',
        phone: this.form.value.phone || '',
        skype: this.form.value.skype || '',
        email: this.form.value.email || '',
        file: this.form.value.avatar_img || 'noImage',
        password: this.form.value.password,
        role_id: localStorage.getItem('in-level')
      };
      this.teacherService.updateUser(admin, () => {
        this.disableForm();
        this.emailUsed = false;
        this.toastr.success('Профиль успешно обновлен', admin['username']);
      }, (err) => {
        this.emailUsed = err;
      });
    }
    // // console.log(this.isEmailUsed);
    // if (this.emailUsed === false) {
    // 	this.disableForm();
    // }
  }

  ngOnDestroy() {
    if (this.adminSub) {
      this.adminSub.unsubscribe();
    }
  }

  onImagePicked = (event: Event) => {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({avatar_img: file});
    this.form.get('avatar_img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);

    // console.log(file);
    // console.log(this.form);
  };

  onPhoneInput = (event: any) => {
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

  disableForm = () => {
    this.teacherService.disableForm(this.form);
    this.isEditMode = false;
  };
  enableForm = () => {
    this.emailUsed = false;
    this.teacherService.enableForm(this.form);
    this.isEditMode = true;
  };
}
