import { notificationTypeEnum } from './../../enums/notificationTypeEnum';
import { UserRoleEnum } from './../../enums/userRoleEnum';
import { environment } from './../../../environments/environment';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { lawStatusEnum } from '../../enums/lawStatusEnum';
import * as moment from "moment";
import { PaginationModel } from '../../Interfaces/PaginationModel';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() columns = [];
  @Input() rows = [];
  // pagination
  @Input() paginationModel: PaginationModel = { PageNumber: 1, TotalItems: 0, PageSize: 10 };
  pageNumber;

  deletion = lawStatusEnum.DeletionApproval;
  pending = lawStatusEnum.PendingApproval;
  inEdit = lawStatusEnum.InEdit;
  published = lawStatusEnum.Published;
  created = lawStatusEnum.Created;
  approver = UserRoleEnum.Approver;

  @Input() edit?= true;
  @Input() delete?= true;
  @Input() publish?= false;
  @Input() sendToApprove?= false;
  @Input() sendForApproval?= false;
  @Input() sendToChangeStatus?= false;
  @Input() fullContent?= false;
  @Input() edit_user?= false;
  @Input() editItemsForApproval?= false;
  @Input() edit_notification?= false;
  @Input() edit_lawAmendment?= false;
  @Input() sendToLawAmendment?= false;
  @Input() delete_lawAmendment?= false;
  @Input() delete_notification?= false;
  @Input() delete_blogPost?= false;
  @Input() edit_approve?= false;
  @Input() edit_importantTaxDate?= false;
  @Input() delete_approve?= false;
  @Input() deleteItemsForApproval?= false;
  @Input() delete_section?= false;
  @Input() role_data?= false;
  @Input() translate?= false;

  @Output() public paginationEmitter: EventEmitter<PaginationModel> = new EventEmitter();
  @Output() public actionClicked: EventEmitter<any> = new EventEmitter();
  @Output() public sentToApproval: EventEmitter<any> = new EventEmitter();
  @Output() public actionPublished: EventEmitter<any> = new EventEmitter();
  @Output() public actionClickedLawAmendment: EventEmitter<any> = new EventEmitter();
  @Output() public actionClickedNotification: EventEmitter<any> = new EventEmitter();
  @Output() public columnFilter: EventEmitter<any> = new EventEmitter();
  @Output() public doPaginate: EventEmitter<any> = new EventEmitter();
  @Output() public isActive: EventEmitter<any> = new EventEmitter();

  public isUserActive: any;
  public fileName;
  totalPages;
  paginationStart = 0;
  paginationEnd = 5;

  NumberOfPages(start: number = 0, end: number = 0) {

    let array;
    if (this.paginationModel.TotalItems % this.paginationModel.PageSize == 0) {
      let size = Math.floor(this.paginationModel.TotalItems / this.paginationModel.PageSize)
      array = Array(size);
    }
    else if (this.paginationModel.TotalItems > this.paginationModel.PageSize) {
      let size = Math.floor(this.paginationModel.TotalItems / this.paginationModel.PageSize) + 1
      array = Array(size);
    }
    else {
      array = Array(1);
    }

    for (let i = 0; i < array.length; ++i) {
      array[i] = i + 1;
    }

    if (end > 0) {
      array = array.slice(start, end);
    }
    return array;
  }
  constructor(
    private lightbox: Lightbox
  ) { }

  ngOnInit() {
    this.pageNumber = this.paginationModel.PageNumber;
    this.totalPages = this.NumberOfPages();
  }

  ngOnChanges() {
    if (this.columns.length > 0 && !!this.rows && this.rows.length > 0) {
      this.columns.forEach(element => {
        if (!!element.property && element.property === 'innerHTML') {
          element.isCollapsed = true;
          this.rows.forEach(e => {
            e[element.name + 'collapsed'] = true;
          });
        }
      });
    }
    this.pageNumber = this.paginationModel.PageNumber;
  }

  public getData(row: any, propertyName: string): string {
    return propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
  }

  actionEvent(action, id) {
    this.actionClicked.emit({ action: action, id: id });
  }

  actionEventNotification(action, slug) {
    this.actionClickedNotification.emit({ action: action, slug: slug });
  }

  actionEventLawAmendment(action, lawArticleId) {
    this.actionClickedLawAmendment.emit({ action: action, lawArticleId: lawArticleId });
  }

  sendToApproval(id) {
    this.sentToApproval.emit({ id: id });
  }

  publishEvent(id) {
    this.actionPublished.emit({ id: id });
  }

  switchBtnEvent(e, userId) {
    this.isActive.emit({ userId: userId, value: e.target.checked });
  }

  isVisibleEvent(event, id) {
    this.isActive.emit({ id: id, value: event.target.checked });
  }

  showPreviewPdf(filePath: string) {
    return `${filePath}`;
  }

  open(path: string, index: number): void {
    // open lightbox
    this.lightbox.open([{ src: path, thumb: path }], index);
  }

  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }


  openNewWindow(path: string) {
    window.open(path);
  }

  setModifyDate(date) {
    if (date != null) {
      return moment(new Date(date), 'DD/MM/YYYY hh:mm').fromNow();
    }
    return 'Not logged in yet';
  }

  formatDate(date) {
    return moment(new Date(date)).format('DD/MM/YYYY ');
  }

  paginate(pageNumber) {
    if (pageNumber <= 3) {
      this.paginationStart = 0;
      this.paginationEnd = 5;
    } else
      if (pageNumber < this.paginationModel.PageNumber) {
        this.paginationStart--;
        this.paginationEnd--;
      }
      else {
        this.paginationStart++;
        this.paginationEnd++;
      }
    let condition = this.paginationModel.TotalItems % this.paginationModel.PageSize == 0;
    if (condition) {
      var comparer = Math.floor(this.paginationModel.TotalItems / this.paginationModel.PageSize);
    }
    else
      comparer = Math.floor(this.paginationModel.TotalItems / this.paginationModel.PageSize) + 1;
    if (pageNumber <= comparer && pageNumber > 0) {
      this.pageNumber = pageNumber;
      this.paginationModel.PageNumber = pageNumber;
      this.paginationEmitter.emit(this.paginationModel);
      this.giveActiveClass(pageNumber);
    }
  }

  onPageSizeChange(event) {
    this.paginationStart = 0;
    this.paginationEnd = 5;
    this.paginationModel.PageNumber = 1;
    this.pageNumber = 1;
    this.paginationModel.PageSize = event.target.value;
    this.paginationEmitter.emit(this.paginationModel);
  }

  giveActiveClass(id) {
    var li = document.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
      if (li[i].classList.contains('active')) {
        li[i].classList.remove('active');
      }
    }
    document.getElementById(id).classList.add('active');
  }

  next() {
    if (this.pageNumber >= this.paginationEnd) {
      this.paginationStart += 10;
      this.paginationEnd += 10;
    }
    this.paginate(this.pageNumber + 1);
  }

  previous() {
    if (this.pageNumber <= this.paginationStart) {
      this.paginationStart -= 10;
      this.paginationEnd -= 10;
    }
    this.paginate(this.pageNumber - 1);
  }

  notificationTypeEnumToString(notificationType: string) {
    switch (notificationType) {
      case notificationTypeEnum.APPROVAL_REQUEST:
        return 'Approval Request'
      case notificationTypeEnum.IMPORTANT_TAX_DATE:
        return 'Important Tax Date'
      case notificationTypeEnum.GENERAL:
        return 'General'
      case notificationTypeEnum.TAX_NEWS:
        return 'Tax News'
    }
  }
}
