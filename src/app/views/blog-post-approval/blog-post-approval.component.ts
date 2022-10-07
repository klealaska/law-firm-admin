import { Pagination } from './../../Interfaces/Pagination';
import { PaginateableTable } from './../../Interfaces/PaginateableTable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BlogPostApprovalService } from '../../services/blog-post-approval/blog-post-approval.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal/';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { AddEditBlogPostComponent } from '../../add-edit-modals/add-edit-blog-post/add-edit-blog-post.component';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { ApproveModalComponent } from '../../components/approve-modal/approve-modal.component';
import { Router } from '@angular/router';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { lawStatusEnum } from '../../enums/lawStatusEnum';
import * as moment from 'moment';

@Component({
  selector: 'app-blog-post-approval',
  templateUrl: './blog-post-approval.component.html',
  styleUrls: ['./blog-post-approval.component.scss']
})
export class BlogPostApprovalComponent implements OnInit, PaginateableTable {

  public data = new Array();
  public filterQuery;
  public modalRef: BsModalRef;
  paginationModel: PaginationModel = { TotalItems: 1, PageNumber: 1, PageSize: 1 };

  columns = [
    { title: 'Status', name: 'status', property: 'isStatus' },
    { title: 'Publish Date', name: 'publishedDate', property: 'width8' },
    { title: 'Title', name: 'title', property: 'width20' },
    { title: 'Description', name: 'description', property: 'isContent' },
    { title: 'Industry', name: 'userGroupName', property: 'width18' },
    { title: 'Authors', name: 'authors', property: 'isAuthor' },
    { title: 'Tags', name: 'blogPostTags', property: 'isTag' },
    { title: 'Attachments', name: 'attachmentUrls', property: 'blogPdfs' },
    { title: 'Image', name: 'imageUrl', property: 'isImage' },
    { title: 'Actions', property: 'actions', class: 'text-center' },
  ];

  @ViewChild('editElement', { static: true }) editElement: AddEditBlogPostComponent;

  constructor(private toast: ToastrService,
    private blogPostApprovalService: BlogPostApprovalService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private router: Router
  ) { }


  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.spinner.show();
    let pagination = new Pagination(this.paginationModel);
    this.blogPostApprovalService.getAll(pagination).subscribe((res: any) => {
      this.paginationModel.TotalItems = res.totalRecords;
      this.paginationModel.PageNumber = res.pageNumber;
      this.paginationModel.PageSize = res.pageSize;
      this.data = res.body;
      this.data.forEach(blog => {
        blog.publishedDate = moment(blog.publishedDate).format('MMM Do YYYY');
      });
      this.spinner.hide();
    }, () => {
      this.toast.error('Something went wrong, try again later.');
      this.spinner.hide();
    });
  }

  openModal() {
    this.router.navigate(['approveBlogPost'], { queryParams: { pageType: 'add' } });
  }

  onActionClick(event: any) {
    switch (event.action) {
      case 'delete':
        this.deleteItem(event.id);
        break;
      case 'edit':
        this.editItem(event.id);
        break;
      case 'forApproval':
        this.sendForApproval(event.id);
        break;
      default:
        break;
    }
  }

  editItem(id) {
    this.router.navigate(['approveBlogPost'], { queryParams: { pageType: 'edit', itemId: `${id}` } });
  }

  deleteItem(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'Blog Post Approval'
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isdeleted) {
        this.getData();
      }
    }, error => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  sendForApproval(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'BlogPost'
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(ApproveModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isSent) {
        this.data.find(x => x.id == id).status = lawStatusEnum.PendingApproval;
      }
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }
}

