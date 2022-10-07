import { BlogPostApprovalService } from './../../services/blog-post-approval/blog-post-approval.service';
import { LawService } from './../../services/law/law.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { LawAmendmentService } from '../../services/law-amendment/law-amendment.service';
import { BlogPostApprovalComponent } from '../../views/blog-post-approval/blog-post-approval.component';
import { InternalObservablesService } from '../../services/internal-observables/internal-observables.service';

@Component({
  selector: 'app-publish-modal',
  templateUrl: './publish-modal.component.html',
  styleUrls: ['./publish-modal.component.scss']
})
export class PublishModalComponent implements OnInit {

  modalRef: BsModalRef;
  id: any;
  item: any;
  isPublished = false;
  isSubmitted = false;
  status;
  language;

  constructor(
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private blogPostApprovalService: BlogPostApprovalService,
    private internalObservablesService: InternalObservablesService,
    private lawService: LawService
  ) { }

  ngOnInit() {
  }

  errorMessage(error?) {
    this.toastr.error(`Error!Something went wrong.`);
    this.bsModalRef.hide();
  }

  onPublish() {
    if (!this.id) {
      this.errorMessage();
      return;
    }
    this.isSubmitted = true;
    switch (this.item) {
      case 'LawSection':
        this.publishLaw(this.id, this.language);
        break;
      case 'BlogPost':
        this.publishBlogPost(this.id);
        break;
      default:
        break;
    }
  }

  publishLaw(id, language) {
    this.lawService.publishLaw(id, language).subscribe((res: any) => {
      this.toastr.success('Law published successfuly!');
      this.status = res.status;
      this.isPublished = true;
      this.bsModalRef.hide();
      this.internalObservablesService.closeModal.next();
    }, () => {
      this.errorMessage();
    });
  }

  publishBlogPost(id) {
    this.blogPostApprovalService.publish(id).subscribe(() => {
      this.toastr.success('Blog post published successfuly!');
      this.isPublished = true;
      this.bsModalRef.hide();
    }, () => {
      this.errorMessage();
    });
  }
}
