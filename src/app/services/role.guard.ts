import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import {AuthService} from './auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class RoleGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private router: Router,
              private toastr: ToastrService,
              private authService: AuthService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  canLoad(route: Route): boolean {
    return this.checkRole(route);
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    return this.checkRole(route);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRole(childRoute);
  }

  checkRole(route): boolean {
    return this.authService.checkRole(route);
  }
}
