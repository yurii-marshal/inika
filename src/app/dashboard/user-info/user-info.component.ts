import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeacherApiService} from '../../services/api/teacher-api.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'in-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {
	public user: {
    adminAvatarUrl: any,
    username: any,
    email: any
  };
	admin: any;
	adminSub: Subscription;
	bg = '../../assets/images/user-bg.jpg';

	constructor(public userService: TeacherApiService) {
	}

	ngOnInit() {
		this.userService.getUser('me')
			.subscribe((response) => {
				this.user = {
					adminAvatarUrl: response['data'].user.avatar_url,
					username: response['data'].user.username,
					email: response['data'].user.email
				};
			});
		this.adminSub = this.userService.adminUpdatedListener()
			.subscribe((updatedAdmin) => {
				this.user = {
					adminAvatarUrl: updatedAdmin.avatar_thumb_url,
					username: updatedAdmin.username,
					email: updatedAdmin.email
				};
			});
	}

	ngOnDestroy() {
		this.adminSub.unsubscribe();
	}

}
