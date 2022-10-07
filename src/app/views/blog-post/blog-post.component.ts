import { lawStatusEnum } from './../../enums/lawStatusEnum';
import { Pagination } from './../../Interfaces/Pagination';
import { PaginateableTable } from './../../Interfaces/PaginateableTable';
import { AddEditBlogPostComponent } from './../../add-edit-modals/add-edit-blog-post/add-edit-blog-post.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal/';
import * as moment from 'moment';
import { BlogPostApprovalComponent } from '../blog-post-approval/blog-post-approval.component';
import { ApproveModalComponent } from '../../components/approve-modal/approve-modal.component';
import { ChangeStatusModalComponent } from '../../components/change-status-modal/change-status-modal.component';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { StorageService } from '../../services/storage/storage.service';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';

export enum tabStateEnum {
  publishedTab = 'PublishedTab',
  inEditTab = 'inEditTab',
}

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, PaginateableTable {

  public data = new Array();
  public activeTab: string = tabStateEnum.publishedTab;
  public publishedTab: string = tabStateEnum.publishedTab;
  public inEditTab: string = tabStateEnum.inEditTab;

  public filterQuery;
  public modalRef: BsModalRef;
  paginationModel: PaginationModel = { TotalItems: 0, PageNumber: 0, PageSize: 1 };

  columns = [
    { title: 'Status', name: 'status', property: 'isStatus' },
    { title: 'Publish Date', name: 'publishedDate', property: 'width8' },
    { title: 'Title', name: 'title', property: 'width20' },
    { title: 'Description', name: 'description', property: 'isContent' },
    { title: 'Industry', name: 'userGroupName', property: 'width20' },
    { title: 'Authors', name: 'authors', property: 'isAuthor' },
    { title: 'Tags', name: 'blogPostTags', property: 'isTag' },
    { title: 'Attachments', name: 'attachmentUrls', property: 'blogPdfs' },
    { title: 'Approved By', name: 'approvedBy', property: 'isApprovedBy' },
    { title: 'Image', name: 'imageUrl', property: 'isImage' },
    { title: 'Actions', property: 'actions', class: 'text-center' },
  ];

  @ViewChild('editElement', { static: true }) editElement: AddEditBlogPostComponent;
  @ViewChild('blogPostApproval', { static: true }) blogPostApproval: BlogPostApprovalComponent;

  constructor(
    private toast: ToastrService,
    private blogPostService: BlogPostService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private storageService: StorageService
  ) { }

  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
    this.getBlogPostData();
  }

  ngOnInit() {
    this.setStateOnInit()
  }

  setStateOnInit() {
    this.activeTab = this.storageService.getStorage(storageLabelsEnum.BlogPostTabState);
    if (this.activeTab != null) {
      if (this.activeTab === this.publishedTab) {
        this.getBlogPostData();
      } else if (this.activeTab === this.inEditTab) {
        this.blogPostApproval.getData();
      }
    } else {
      this.activeTab = this.publishedTab;
      this.getBlogPostData();
    }
  }

  setTabState(state) {
    this.storageService.setStorage(storageLabelsEnum.BlogPostTabState, state);
  }

  getBlogPostData() {
    this.spinner.show();
    let paginate = new Pagination(this.paginationModel);
    this.blogPostService.getAll(paginate).subscribe((res: any) => {
      this.paginationModel.TotalItems = res.totalRecords;
      this.paginationModel.PageNumber = res.pageNumber;
      this.paginationModel.PageSize = res.pageSize;
      this.data = res.body;
      this.data.forEach(blog => {
        blog.publishedDate = moment(blog.publishedDate).format('MMM Do YYYY');
        blog.approvedOn = moment(blog.approvedOn).format('MMM Do YYYY');
      });
      this.spinner.hide();
    }, () => {
      this.toast.error('Something went wrong, try again later.');
      this.spinner.hide();
    });
  }

  // openModal() {
  //   this.editElement.pageType = 'add';
  //   this.editElement.openModal();
  // }

  onActionClick(event: any) {
    switch (event.action) {
      case 'delete':
        this.deleteItem(event.id);
        break;
      case 'fullContent':
        this.getFullContent(event.id);
        break;
      case 'send':
        this.changeStatusInEdit(event.id);
        break;
      default:
        break;
    }
  }

  getFullContent(id) {
    this.editElement.pageType = 'fullContent';
    this.editElement.itemId = id;
    this.editElement.openModal();
  }

  // editItem(id) {
  //   this.editElement.pageType = 'edit';
  //   this.editElement.itemId = id;
  //   this.editElement.openModal();
  // }

  deleteItem(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'BlogPostDelete'
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(ApproveModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isSent) {
        this.data.find(x => x.id == id).status = lawStatusEnum.DeletionApproval;
      }
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  changeStatusInEdit(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'BlogPost'
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(ChangeStatusModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isSent) {
        this.data.find(x => x.id == id).status = lawStatusEnum.InEdit;
      }
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  onTabSelect(type) {
    switch (type) {
      case tabStateEnum.publishedTab:
        {
          this.setTabState(tabStateEnum.publishedTab);
          this.getBlogPostData();
          break;
        }
      case tabStateEnum.inEditTab:
        {
          this.setTabState(tabStateEnum.inEditTab);
          this.blogPostApproval.getData();
          break;
        }
      default:
        break;
    }
  }
}
