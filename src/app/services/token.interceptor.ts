import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(private auth: AuthService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// // console.log(this.auth.getToken());

		if (this.auth.isAuthenticated()) {
			const reqClone = req.clone({
				setHeaders: {
					'Authorization': this.auth.getToken()
				}
			});

			return next.handle(reqClone);
		}
		return next.handle(req);
	}
}
