import { BlogPostApprovalService } from './../../services/blog-post-approval/blog-post-approval.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-status-modal',
  templateUrl: './change-status-modal.component.html',
  styleUrls: ['./change-status-modal.component.scss']
})
export class ChangeStatusModalComponent implements OnInit {

  modalRef: BsModalRef;
  id: any;
  item: any;
  isSent = false;
  isSubmitted: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private blogPostApprovalService: BlogPostApprovalService
  ) { }

  ngOnInit() {
    this.isSubmitted = false;
  }

  errorMessage(error?) {
    this.toastr.error(`Error!Something went wrong.`);
    this.bsModalRef.hide();
  }

  onSend() {
    if (!this.id) {
      this.errorMessage();
      return;
    }
    this.isSubmitted = true;
    switch (this.item) {
      case 'BlogPost':
        this.sendBlogPost(this.id);
        break;
      default:
        break;
    }
  }

  sendBlogPost(id) {
    this.blogPostApprovalService.changeBlogPostInEditStatus(id).subscribe(() => {
      this.toastr.success('Law published successfuly!');
      this.isSent = true;
      this.bsModalRef.hide();
    }, (error) => {
      error.status === 400 ? this.toastr.warning(error.error.message)
        : this.toastr.error('Something went wrong,try again later');
      this.bsModalRef.hide();
    });
  }
}
