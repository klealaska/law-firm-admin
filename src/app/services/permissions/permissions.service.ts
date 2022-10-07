// import { navItems } from './../../_nav';
import { Injectable } from '@angular/core';
import { navItems, NavData } from '../../_nav';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  items$;
  navItems = navItems;
  role = new Array();
  urlList = new Array();

  constructor(
    private storageService: StorageService,
  ) { }

  public getSidebarItems() {
    this.items$ = new Array<NavData>();
    this.urlList = new Array();
    this.role = JSON.parse(this.storageService.getStorage(storageLabelsEnum.UserRoles));
    if (this.role != null) {
      // routes not included at nav items
      this.urlList.push('/userProfile');
      this.urlList.push('/lawSection');
      this.urlList.push('/lawInAmendment');
      this.urlList.push('/approveLaw');
      this.urlList.push('/approveBlogPost');
      this.navItems.forEach((item) => {
        this.role.forEach(el => {
          if (item.role.some(r => r.includes(el))) {
            if (!this.items$.includes(item)) {
              this.urlList.push(item.url);
              if (!!item.children) {
                item.children.forEach(child => {
                  this.urlList.push(child.url);
                });
              }
              this.items$.push(item);
            }
          }
        });
      });
    }
    return this.items$;
  }
}
