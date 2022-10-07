import { RoleService } from './../../services/user-role/role.service';
import { NotificationService } from './../../services/notification/notification.service';
import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';

enum NotificationTypeEnum {
  GENERAL = 0,
  IMPORTANT_TAX_DATE = 1,
  TAX_NEWS = 2
}

@Component({
  selector: 'app-add-edit-notification',
  templateUrl: './add-edit-notification.component.html',
  styleUrls: ['./add-edit-notification.component.scss']
})
export class AddEditNotificationComponent implements OnInit {

  public name = '';
  public title = '';
  public description = '';
  public link = '';
  public dateOfRelease = new Date();
  public notificationType: number;
  public userRoles = new Array();
  public itemId;
  public slug;
  public today = new Date();
  isSubmitted: boolean = false;

  roleList = new Array();
  isValid: boolean;

  notificationTypeList = [
    { name: 'General', id: NotificationTypeEnum.GENERAL },
    { name: 'Important Tax Date', id: NotificationTypeEnum.IMPORTANT_TAX_DATE },
    { name: 'Tax News', id: NotificationTypeEnum.TAX_NEWS }
  ];

  pageType: any;
  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @Output() public submited: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-lg'
  };

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private notificationService: NotificationService,
    private roleService: RoleService,
  ) {
  }

  ngOnInit() {
    this.getUserRoles();
    this.dateOfRelease = new Date();
  }

  openModal() {
    this.defaultValues();
    this.modalRef = this.modalService.show(this.template, this.config);
    if (this.pageType === 'edit') {
      this.getData();
    }
  }

  getData() {
    let notification: any;
    this.notificationService.getAllNotificationGroups().subscribe((res: any) => {
      notification = res.body.find(el => el.slug === this.slug);
      this.name = notification.name;
      this.title = notification.title;
      this.description = notification.description;
      this.userRoles = notification.roles;
      this.dateOfRelease = new Date(notification.dateOfRelease);
      this.link = notification.link;
      this.notificationType = this.getNotificationType(notification.notificationTypeString);
    });
  }

  getUserRoles() {
    this.roleService.getAll().subscribe((res: any) => {
      this.roleList = res;
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.pageType === 'edit') {
      this.update();
    } else if (this.pageType === 'add') {
      this.add();
    }
  }

  add() {
    this.isValid = true;
    const data = {
      name: this.name,
      title: this.title,
      description: this.description,
      dateOfRelease: new Date(this.dateOfRelease).toLocaleDateString(),
      link: this.link,
      notificationType: this.notificationType,
      userRoles: this.userRoles
    };
    this.validateStringData(this.name, 'Name');
    this.validateStringData(this.title, 'Title');
    this.validateStringData(this.description, 'Description');
    this.validateStringData(this.dateOfRelease, 'Date of Release');
    this.validateArrayData(this.userRoles, 'User Role');
    this.validateNullOrUndifinedData(this.notificationType, 'Notification Type');
    if (this.isValid) {
      this.notificationService.postCreateNotificationGroup(data).subscribe(() => {
        this.toast.success('Notification created succesfully!');
        this.modalRef.hide();
        this.submited.emit();

      }, error => {
        this.toast.error('Error!Something went wrong, try again later.');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
  }

  update() {
    this.isValid = true;
    const dataToUpdate = {
      slug: this.slug,
      name: this.name,
      title: this.title,
      description: this.description,
      dateOfRelease: new Date(this.dateOfRelease).toLocaleDateString(),
      link: this.link,
      // notificationType: this.notificationType,
      userRoles: this.userRoles
    };
    this.validateStringData(this.name, 'Name');
    this.validateStringData(this.title, 'Title');
    this.validateStringData(this.description, 'Description');
    this.validateArrayData(this.userRoles, 'User Role');
    this.validateNullOrUndifinedData(this.dateOfRelease, 'Date of Release');
    this.validateNullOrUndifinedData(this.notificationType, 'Notification Type');
    if (this.isValid) {
      this.notificationService.updateNotificationGroup(dataToUpdate).subscribe(() => {
        this.toast.success('Notification updated succesfully!');
        this.modalRef.hide();
        this.submited.emit();

      }, error => {
        this.toast.error('Error!Something went wrong, try again later.');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
  }

  validateStringData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  validateArrayData(attr, id: string) {
    if (attr.length === 0) {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  validateNullOrUndifinedData(attr, id: string) {
    if (attr == null || attr === undefined) {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  getNotificationType(type) {
    switch (type) {
      case 'GENERAL':
        return NotificationTypeEnum.GENERAL;
      case 'IMPORTANT_TAX_DATE':
        return NotificationTypeEnum.IMPORTANT_TAX_DATE;
      case 'TAX_NEWS':
        return NotificationTypeEnum.TAX_NEWS;
      default:
        break;
    }
  }

  defaultValues() {
    this.isSubmitted = false;
    this.name = '';
    this.title = '';
    this.description = '';
    this.link = '';
    this.dateOfRelease = null;
    this.notificationType = null;
    this.userRoles = new Array();
  }
}
