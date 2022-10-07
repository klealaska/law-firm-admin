import { PermissionsService } from './../permissions/permissions.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  urlList = new Array();
  constructor(
    private userService: UserService,
    private router: Router,
    private permissionsService: PermissionsService
  ) {
  }

  canActivate(activeRoute: ActivatedRouteSnapshot) {
    this.permissionsService.getSidebarItems()
    this.urlList = this.permissionsService.urlList;
    let route = activeRoute.routeConfig.path;
    if (this.userService.isLoggedIn()) {
      if (this.checkUrl(route)) {
        return true;
      } else {
        this.router.navigate(['login']);
      }
    } else {
      this.router.navigate(['login']);
    }
  }

  checkUrl(path: string) {
    if (this.urlList.includes(`/${path}`)) {
      return true;
    }
    return false;
  }
}
