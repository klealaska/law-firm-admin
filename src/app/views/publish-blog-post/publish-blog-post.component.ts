import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from './../../Interfaces/Pagination';
import { PaginateableTable } from './../../Interfaces/PaginateableTable';
import { Router } from '@angular/router';
import { BlogPostService } from './../../services/blog-post/blog-post.service';
import { AddEditBlogPostComponent } from './../../add-edit-modals/add-edit-blog-post/add-edit-blog-post.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { BlogPostApprovalService } from '../../services/blog-post-approval/blog-post-approval.service';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { PublishModalComponent } from '../../components/publish-modal/publish-modal.component';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import * as moment from 'moment';
import { StorageService } from '../../services/storage/storage.service';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';

export enum tabStateEnum {
  ApprovalTab = 'ApprovalTab',
  DeletionTab = 'DeletionTab',
}

@Component({
  selector: 'app-publish-blog-post',
  templateUrl: './publish-blog-post.component.html',
  styleUrls: ['./publish-blog-post.component.scss']
})
export class PublishBlogPostComponent implements OnInit, PaginateableTable {

  public data: any;
  public deletionData: any;

  // tab props
  activeTab: string = tabStateEnum.ApprovalTab;
  approvalTab = tabStateEnum.ApprovalTab;
  deletionTab = tabStateEnum.DeletionTab;

  public filterQuery;
  public modalRef: BsModalRef;
  @ViewChild('editElement', { static: false }) editElement: AddEditBlogPostComponent;

  columns = [
    { title: 'Status', property: 'lawStatus' },
    { title: 'Publish Date', name: 'publishedDate', property: 'width8' },
    { title: 'Title', name: 'title', property: 'width20' },
    { title: 'Description', name: 'description', property: 'isContent' },
    { title: 'Industry', name: 'userGroupName', property: 'width20' },
    { title: 'Authors', name: 'authors', property: 'isAuthor' },
    { title: 'Tags', name: 'blogPostTags', property: 'isTag' },
    { title: 'Attachments', name: 'attachmentUrls', property: 'blogPdfs' },
    { title: 'Image', name: 'imageUrl', property: 'isImage' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  constructor(
    private toast: ToastrService,
    private modalService: BsModalService,
    private blogPostService: BlogPostService,
    private blogPostApprovalService: BlogPostApprovalService,
    private router: Router,
    private storageService: StorageService,
    private spinner: NgxSpinnerService
  ) { }


  paginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };
  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
    this.getBlogPostsForApproval();
  }

  deletionTablePaginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };
  onDeletionTablePaginationValuesChange(values: PaginationModel) {
    this.deletionTablePaginationModel = values;
    this.getBlogPostForDeletion();
  }

  ngOnInit() {
    this.setStateOnInit();
  }

  setStateOnInit() {
    this.activeTab = this.storageService.getStorage(storageLabelsEnum.BlogPostApprovalTabState);
    if (this.activeTab != null) {
      if (this.activeTab === this.approvalTab) {
        this.getBlogPostsForApproval();
      } else if (this.activeTab === this.deletionTab) {
        this.getBlogPostForDeletion();
      }
    } else {
      this.getBlogPostsForApproval();
    }
  }

  setTabState(state) {
    this.storageService.setStorage(storageLabelsEnum.BlogPostApprovalTabState, state);
  }

  getBlogPostForDeletion() {
    this.spinner.show();
    let pagination = new Pagination(this.deletionTablePaginationModel);
    this.blogPostService.getAllWithDeletionStatus(pagination).subscribe((res: any) => {
      this.deletionTablePaginationModel.PageNumber = res.pageNumber;
      this.deletionTablePaginationModel.TotalItems = res.totalRecords;
      this.deletionTablePaginationModel.PageSize = res.pageSize;
      this.deletionData = res.body;
      this.deletionData.forEach(blog => {
        blog.publishedDate = moment(blog.publishedDate).format('MMM Do YYYY');
      });
      this.spinner.hide();
    }, () => {
      this.toast.error('Something went wrong, try again later.');
      this.spinner.hide();
    });
  }

  getBlogPostsForApproval() {
    this.spinner.show();
    let pagination = new Pagination(this.paginationModel);
    this.blogPostApprovalService.getBlogPostWithPendingApprovalStatus(pagination).subscribe((res: any) => {
      this.paginationModel.PageNumber = res.pageNumber;
      this.paginationModel.TotalItems = res.totalRecords;
      this.paginationModel.PageSize = res.pageSize;
      this.data = res.body;
      this.data.forEach(blog => {
        blog.publishedDate = moment(blog.publishedDate).format('MMM Do YYYY');
      });
      this.spinner.hide();
    }, () => {
      this.toast.error('Something went wrong!Try again later.');
      this.spinner.hide();
    });
  }

  onActionClick(event: any) {
    switch (event.action) {
      case 'edit':
        this.editItem(event.id, 'editToPublish');
        break;
      case 'delete':
        this.deleteItem(event.id);
        break;
      case 'fullContent':
        this.editItem(event.id, 'fullContent');
        break;
      default:
        break;
    }
  }

  editItem(id, pageType) {
    this.router.navigate(['approveBlogPost'], { queryParams: { pageType: `${pageType}`, itemId: `${id}` } });
  }

  deleteItem(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'Blog Post'
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isdeleted) {
        this.getBlogPostForDeletion();
      }
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  publish(event) {
    const config: ModalOptions = {
      initialState: {
        id: event.id,
        item: 'BlogPost'
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(PublishModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isPublished) {
        this.getBlogPostsForApproval();
      }
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  onTabSelect(type) {
    switch (type) {
      case this.deletionTab:
        this.setTabState(this.deletionTab);
        this.getBlogPostForDeletion();
        break;
      case this.approvalTab:
        this.setTabState(this.approvalTab);
        this.getBlogPostsForApproval();
        break;
      default:
        break;
    }
  }
}
