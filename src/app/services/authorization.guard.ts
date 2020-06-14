import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(public router: Router,
              private authService: AuthService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
    // // console.log(route, state);
    // return this.oidcSecurityService.getIsAuthorized().pipe(
    //   map((isAuthorized: boolean) => {
    //     // // console.log('AuthorizationGuard isAuthorized: ' + isAuthorized);
    //     if (!isAuthorized) {
    //         this.router.navigate(['/unauthorized']);
    //         return false;
    //     }
    //     return true;
    //   })
    // );
  }
}
