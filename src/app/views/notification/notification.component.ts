import { PaginateableTable } from './../../Interfaces/PaginateableTable';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from './../../services/notification/notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { AddEditNotificationComponent } from '../../add-edit-modals/add-edit-notification/add-edit-notification.component';
import * as moment from 'moment';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { Pagination } from '../../Interfaces/Pagination';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, PaginateableTable {

  groupsData = new Array();
  userRoles = new Array();
  public modalRef: BsModalRef;
  public filterQuery;

  @ViewChild('modal', { static: false }) modal: AddEditNotificationComponent;

  columnsNotificationsGroup = [
    { title: 'Notification Type', name: 'notificationTypeString', property: 'notificationType' },
    { title: 'Name', name: 'name' },
    { title: 'Title', name: 'title', property: 'width20' },
    { title: 'Description', name: 'description', property: 'width20' },
    { title: 'Link', name: 'link', property: 'isLink' },
    { title: 'Release Date', name: 'dateOfRelease', property: 'width8' },
    { title: 'User Roles', name: 'roles', property: 'listOfStrings' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];
  paginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };

  constructor(
    private notificationService: NotificationService,
    private toast: ToastrService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
  ) { }
  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
    this.getNotificationGroups();
  }

  ngOnInit() {
    this.getNotificationGroups();
  }

  getNotificationGroups() {
    this.spinner.show();
    this.groupsData = new Array();
    let paginate = new Pagination(this.paginationModel);
    this.notificationService.getAllNotificationGroups(paginate).subscribe((res: any) => {
      this.paginationModel.TotalItems = res.totalRecords;
      this.paginationModel.PageNumber = res.pageNumber;
      this.paginationModel.PageSize = res.pageSize;
      res.body.forEach(not => {
        if (!not.isDisabled) {
          not.dateOfRelease = moment(not.dateOfRelease).format('MMM Do YYYY');
          this.groupsData.push(not);
          this.spinner.hide();
        }
      });
    }, () => {
      this.toast.error('Error!Something went wrong.');
      this.modalRef.hide();
      this.spinner.hide();
    });
  }

  onActionClick(event: any) {
    switch (event.action) {
      case 'delete':
        this.deleteItem(event.slug);
        break;
      case 'edit':
        this.editItem(event.slug);
        break;
      default:
        break;
    }
  }

  openModal() {
    this.modal.pageType = 'add';
    this.modal.openModal();
  }

  editItem(slug) {
    this.modal.pageType = 'edit';
    this.modal.slug = slug;
    this.modal.openModal();
  }

  deleteItem(slug) {
    const config: ModalOptions = {
      initialState: {
        id: slug,
        item: 'NotificationGroup'
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isdeleted) {
        this.getNotificationGroups();
      }
    }, error => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  refreshGrid() {
    this.getNotificationGroups();
  }
}
