import { PermissionsService } from './../../services/permissions/permissions.service';
import { environment } from './../../../environments/environment';
import { UserImageService } from '../../services/user-image/user-image.service';
import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IUser } from '../../Interfaces/i-user';
import { SignalRNotificationService } from '../../services/signalR/notifications.signalR';
import { InternalObservablesService } from '../../services/internal-observables/internal-observables.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public imagePath;
  public userFirstName;
  public userLastName;
  public notificationList = new Array();

  constructor(
    private notificationService: SignalRNotificationService,
    private userService: UserService,
    private toast: ToastrService,
    private router: Router,
    private userImageService: UserImageService,
    private permissionsService: PermissionsService,
    private internalObservablesService: InternalObservablesService,
    @Inject(DOCUMENT) _document?: any,
  ) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
    this.getProfileImage();
    this.updateProfileImage();
    this.navItems = permissionsService.items$;
  }

  ngOnInit() {
    this.notificationService.startConnection();
    this.notificationService.listenToNotifications();
    this.notificationService.listenToForceLogout().then((message: string) => this.onLogOut(true, message))
    this.internalObservablesService.notificationSubject.subscribe(notification => {
      this.notificationList.push(notification);
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  onLogOut(isForced: boolean, message: string) {
    this.userService.logOut();
    if (isForced)
      this.toast.warning(message);
    else
      this.toast.success('Logged out!');

    this.permissionsService.urlList = new Array();
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getProfileImage() {
    this.userService.getProfile().subscribe((res: IUser) => {
      this.userFirstName = res.firstName;
      this.userLastName = res.lastName;
      if (res.imagePath != null) {
        this.imagePath = res.imagePath.split('\\').join('/');
      } //else {
      //   this.imagePath = `/assets/img/avatar.png`;
      // }
    });
  }

  updateProfileImage() {
    this.userImageService.getNotifications().subscribe((image: any) => {
      this.imagePath = image.image;
    });
  }

  onNotificationClick(link, event) {
    this.notificationList = new Array();
    this.router.navigate([`${link}`]);
  }
}
