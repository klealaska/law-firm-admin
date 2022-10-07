import { CollapseModule } from 'ngx-bootstrap/collapse';
import { Title } from '@angular/platform-browser';
import { RoleService } from './../../services/user-role/role.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from './../../services/notification/notification.service';
import { ImportantTaxDateService } from './../../services/important-tax-date/important-tax-date.service';
import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { add } from 'ngx-bootstrap/chronos/public_api';

@Component({
  selector: 'app-add-edit-important-tax-date',
  templateUrl: './add-edit-important-tax-date.component.html',
  styleUrls: ['./add-edit-important-tax-date.component.scss']
})
export class AddEditImportantTaxDateComponent implements OnInit {

  public eventDate = null;
  public title = '';
  public name = '';
  public description = '';
  public notificationLink = '';
  public releaseDates = new Array<any>();
  public notifications = new Array<any>();
  public itemId;
  public language;
  today = new Date();
  inputsArray = new Array(1);
  isValid: boolean;
  pageType: any;
  userRole: any;
  isSubmitted: boolean = false;

  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @Output() public submited: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-lg'
  };

  constructor(
    private taxDateService: ImportantTaxDateService,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private modalService: BsModalService,
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.getUserRoles();
  }

  openModal() {
    this.defaultValues();
    this.modalRef = this.modalService.show(this.template, this.config);
    if (this.pageType === 'edit') {
      this.getTaxdateDataById();
    }
  }

  closeModal() {
    this.submited.emit();
    this.modalRef.hide();
    this.defaultValues();
  }

  getTaxdateDataById() {
    this.spinner.show();
    this.taxDateService.getById(this.itemId, this.language).subscribe((res: any) => {
      this.notifications = res.notificationGroups;
      this.notifications.forEach(not => {
        not.dateOfRelease = new Date(not.dateOfRelease);
      });
      this.title = res.eventTitle;
      this.description = res.eventDescription;
      this.eventDate = new Date(res.eventDate);
      this.spinner.hide();
    }, () => {
      this.toast.error('Error!Something went wrong.');
      this.spinner.hide();
      this.modalRef.hide();
    });
  }

  addImportantTaxNews() {
    this.isSubmitted = true;
    this.isValid = true;
    const importantTaxDate = {
      eventTitle: this.title,
      eventDescription: this.description,
      eventDate: this.eventDate,
      notificationName: this.name,
      notificationLink: this.notificationLink,
      releaseDates: this.releaseDates,
      userRole: this.userRole
    };
    this.validateStringData(this.title, 'title');
    this.validateStringData(this.description, 'description');
    this.validateNullOrUndifinedData(this.eventDate, 'event date');
    this.validateStringData(this.name, 'Name');
    this.validateArrayData(this.releaseDates, 'Date of Release');
    if (this.isValid) {
      this.taxDateService.postAdd(importantTaxDate, this.language).subscribe(() => {
        this.toast.success('Important Tax Date created succesfully!');
        this.modalRef.hide();
        this.submited.emit();
      }, () => {
        this.modalRef.hide();
        this.toast.error('Adding important tax date failed.Try again later.');
      });
    } else {
      this.isSubmitted = false;
    }
  }

  addTranslation() {
    this.isSubmitted = true;
    this.isValid = true;
    const importantTaxDate = {
      id: this.itemId,
      eventTitle: this.title,
      eventDescription: this.description,
      eventDate: this.eventDate,
      notificationName: this.name,
      notificationLink: this.notificationLink,
      releaseDates: this.releaseDates,
      userRole: this.userRole
    };
    this.validateStringData(this.title, 'title');
    this.validateStringData(this.description, 'description');
    this.validateNullOrUndifinedData(this.eventDate, 'event date');
    this.validateStringData(this.name, 'Name');
    this.validateArrayData(this.releaseDates, 'Date of Release');
    if (this.isValid) {
      this.taxDateService.addTranslation(importantTaxDate, this.language).subscribe(() => {
        this.toast.success('Important Tax Date translated succesfully!');
        this.modalRef.hide();
        this.submited.emit();
      }, () => {
        this.modalRef.hide();
        this.toast.error('Translating important tax date failed.Try again later.');
      });
    } else {
      this.isSubmitted = false;
    }
  }

  update() {
    this.isSubmitted = true;
    this.isValid = true;
    const importantTaxDate = {
      id: this.itemId,
      eventTitle: this.title,
      eventDescription: this.description,
      eventDate: this.eventDate
    };
    this.validateStringData(this.title, 'title');
    this.validateStringData(this.description, 'description');
    this.validateNullOrUndifinedData(this.eventDate, 'event date');
    if (this.isValid) {
      this.taxDateService.update(importantTaxDate, this.language).subscribe(() => {
        this.submited.emit();
        this.toast.success('Important Tax Date updated successfully!');
      }, () => {
        this.toast.error('Something went wrong!Try again later.');
      });
    } else {
      this.isSubmitted = false;
    }
  }

  defaultValues() {
    this.isSubmitted = false;
    this.eventDate = null;
    this.title = '';
    this.name = '';
    this.description = '';
    this.notificationLink = '';
    this.releaseDates = new Array<any>();
    this.inputsArray = new Array(1);
  }

  validateStringData(attr, id: string) {
    if (attr === '') {
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

  validateArrayData(attr, id: string) {
    if (attr.length === 0) {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  addInput() {
    this.inputsArray.push({});
  }

  removeInput(idx: number) {
    this.inputsArray.splice(idx, 1);
    this.releaseDates.splice(idx, 1);
  }

  getUserRoles() {
    this.roleService.getAll().subscribe((res: any) => {
      res.forEach(role => {
        if (!role.isReadOnly) {
          this.userRole = role;
        }
      });
    });
  }

  updateNotificationGroup(index) {
    let notification = this.notifications[index];
    let dataToUpdate = {
      id: notification.id,
      title: notification.title,
      name: notification.name,
      description: notification.description,
      link: notification.link,
      slug: notification.slug,
      dateOfRelease: notification.dateOfRelease,
      notificationType: notification.notificationType,
      userRoles: [this.userRole.name]
    };
    this.notificationService.updateNotificationGroup(dataToUpdate).subscribe(() => {
      this.toast.success('Notification Group updated successfully');
    }, () => {
      this.toast.error('Something went wrong!Try again later.');
    });
  }
}
