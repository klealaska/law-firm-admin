import { BlogPostService } from './../../services/blog-post/blog-post.service';
import { BlogPostApprovalService } from './../../services/blog-post-approval/blog-post-approval.service';
import { LawService } from './../../services/law/law.service';
import { LawAmendmentService } from './../../services/law-amendment/law-amendment.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-approve-modal',
  templateUrl: './approve-modal.component.html',
  styleUrls: ['./approve-modal.component.scss']
})
export class ApproveModalComponent implements OnInit {

  modalRef: BsModalRef;
  id: any;
  item: any;
  isSent = false;
  status: any;
  language: any;
  isSubmitted: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private lawAmendmentService: LawAmendmentService,
    private lawService: LawService,
    private blogPostApprovalService: BlogPostApprovalService,
    private blogPostService: BlogPostService
  ) { }

  ngOnInit() {
    this.isSubmitted = false;
  }

  errorMessage(error?) {
    this.toastr.error(`Error!Something went wrong.`);
  }

  onSending() {
    if (!this.id) {
      this.errorMessage();
      return;
    }
    this.isSubmitted = true;
    switch (this.item) {
      case 'LawAmendment':
        this.sendLawAmendment(this.id, this.language);
        break;
      case 'Section':
        this.sendLawDeletionForApproval(this.id, this.language);
        break;
      case 'BlogPost':
        this.sendBlogPostForApproval(this.id);
        break;
      case 'BlogPostDelete':
        this.sendBlogPostDeletionForApproval(this.id);
        break;
      default:
        break;
    }
  }

  sendLawAmendment(id, language) {
    this.lawAmendmentService.getToApprove(id, language).subscribe((res: any) => {
      this.toastr.success('Law was sent for approval.');
      this.isSent = true;
      this.status = res.status;
      this.bsModalRef.hide();
    }, (error) => {
      error.status === 400 ?
        this.toastr.error(error.error.message) :
        this.errorMessage();
      this.bsModalRef.hide();
    });
  }

  sendLawDeletionForApproval(id, language) {
    this.lawService.sendDeletionForApproval(id, language).subscribe(() => {
      this.toastr.success('Section was sent for approval');
      this.isSent = true;
      this.bsModalRef.hide();
    }, (error) => {
      error.status === 400 ?
        this.toastr.error(error.error.message) :
        this.errorMessage();
      this.bsModalRef.hide();
    });
  }

  sendBlogPostDeletionForApproval(id) {
    this.blogPostService.sendDeletionForApproval(id).subscribe(() => {
      this.toastr.success('Blog Post was sent for approval');
      this.isSent = true;
      this.bsModalRef.hide();
    }, (error) => {
      error.status === 400 ?
        this.toastr.error(error.error.message) :
        this.errorMessage();
      this.bsModalRef.hide();
    });
  }

  sendBlogPostForApproval(id) {
    this.blogPostApprovalService.sendForApproval(id).subscribe(() => {
      this.toastr.success('Blog Post was sent for approval');
      this.isSent = true;
      this.bsModalRef.hide();
    }, (error) => {
      error.status === 400 ?
        this.toastr.error(error.error.message) :
        this.errorMessage();
      this.bsModalRef.hide();
    });
  }
}
