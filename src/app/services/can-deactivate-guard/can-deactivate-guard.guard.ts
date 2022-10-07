import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';


export interface CanDeactivateInterface {
  confirm();
}

@Injectable({
  providedIn: 'root'
})

export class CanDeactivateGuard implements CanDeactivate<CanDeactivateInterface> {

  canDeactivate(
    component: CanDeactivateInterface,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (component.confirm()) {
      return confirm('Are u sure');
    } else {
      return true;
    }
  }
}
