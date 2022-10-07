import { LawCategoryService } from './../../services/law-category/law-category.service';
import { BlogPostApprovalService } from './../../services/blog-post-approval/blog-post-approval.service';
import { LawArticleRelatedLinksService } from './../../services/law-article-related-links/law-article-related-links.service';
import { LawService } from './../../services/law/law.service';
import { ImportantTaxDateService } from './../../services/important-tax-date/important-tax-date.service';
import { HomepageVideoService } from './../../services/homepage-video/homepage-video.service';
import { NotificationService } from './../../services/notification/notification.service';
import { TaxNewsService } from './../../services/tax-news/tax-news.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal/';
import { TagService } from '../../services/tag/tag.service';
import { UserGroupsService } from '../../services/user-groups/user-groups.service';
import { UserCategoryService } from '../../services/user-category/user-category.service';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { LawAmendmentService } from '../../services/law-amendment/law-amendment.service';
import { LawArticleVersionService } from '../../services/law-article-version/law-article-version.service';
import { HyperlinksService } from '../../services/hyperlinks/hyperlinks.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  modalRef: BsModalRef;
  id: any;
  item: any;
  isdeleted = false;
  language;
  isSubmitted: boolean = false;

  constructor(
    private detector: ChangeDetectorRef,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private tagService: TagService,
    private userGroupsService: UserGroupsService,
    private userCategoryService: UserCategoryService,
    private taxNewsService: TaxNewsService,
    private blogPostService: BlogPostService,
    private notificationService: NotificationService,
    private videoService: HomepageVideoService,
    private importantTaxDateService: ImportantTaxDateService,
    private lawService: LawService,
    private lawAmendmentService: LawAmendmentService,
    private lawArticleRelatedLinksService: LawArticleRelatedLinksService,
    private lawArticleVersionService: LawArticleVersionService,
    private blogPostApprovalService: BlogPostApprovalService,
    private hyperlinkService: HyperlinksService,
    private lawCategoryService: LawCategoryService
  ) { }

  ngOnInit() {
  }

  errorMessage(error?) {
    this.toastr.error(`Error!Something went wrong.`);
    this.bsModalRef.hide();
  }

  onDeletingItem() {
    if (!this.id) {
      this.errorMessage();
      return;
    }
    this.isSubmitted = true;
    switch (this.item) {
      case 'Tag':
        this.deleteTag(this.id);
        break;
      case 'Group':
        this.deleteUserGroup(this.id);
        break;
      case 'Category':
        this.deleteUserCategory(this.id);
        break;
      case 'Tax News':
        this.deleteTaxNews(this.id, this.language);
        break;
      case 'Blog Post':
        this.deleteBlogPost(this.id);
        break;
      case 'NotificationGroup':
        this.deleteNotificationGroup(this.id);
        break;
      case 'Video':
        this.deleteVideo(this.id);
        break;
      case 'Important_Tax_Date':
        this.deleteImportantTaxDate(this.id);
        break;
      case 'Law Section':
        this.deleteLawSection(this.id);
        break;
      case 'LawAmendment':
        this.deleteLawAmendment(this.id);
        break;
      case 'LawRelatedLink':
        this.deleteLawRelatedLink(this.id);
        break;
      case 'All_LawRelated_Links':
        this.deleteAllRelatedLinks(this.id);
        break;
      case 'LawApproval':
        this.deleteLawAmendment(this.id);
        break;
      case 'LawArticleVersion':
        this.deleteLawArticleVersion(this.id);
        break;
      case 'LawArticleVersionDetails':
        this.deleteLawArticleVersionDetails(this.id);
        break;
      case 'Blog Post Approval':
        this.deleteBlogPostApproval(this.id);
        break;
      case 'Hyperlink':
        this.deleteHyperlink(this.id);
        break;
      case 'LawCategory':
        this.deleteLawCategory(this.id);
        break;
      default:
        break;
    }


  }

  deleteHyperlink(id) {
    this.hyperlinkService.delete(id).subscribe((res: any) => {
      this.toastr.success(`${this.item} deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteTag(id) {
    this.tagService.delete(id).subscribe((res: any) => {
      this.toastr.success(`${this.item} deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteUserGroup(id) {
    this.userGroupsService.delete(id).subscribe(() => {
      this.toastr.success(`${this.item} deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteUserCategory(id) {
    this.userCategoryService.delete(id).subscribe(() => {
      this.toastr.success(`${this.item} deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteTaxNews(id, language) {
    this.taxNewsService.delete(id, language).subscribe(() => {
      this.toastr.success(`${this.item} deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteBlogPost(id) {
    this.blogPostService.delete(id).subscribe(() => {
      this.toastr.success(`${this.item} deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteNotificationGroup(slug) {
    this.notificationService.deleteNotificationGroup(slug).subscribe(() => {
      this.toastr.success(`${this.item} deleted successfully!`);
      this.isdeleted = true
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteVideo(id) {
    this.videoService.delete(id).subscribe(() => {
      this.toastr.success(`${this.item} deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteImportantTaxDate(id) {
    this.importantTaxDateService.delete(id).subscribe(() => {
      this.toastr.success(`${this.item} deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteLawSection(id) {
    this.lawService.deleteLaw(id).subscribe(() => {
      this.toastr.success(`Law section deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteLawAmendment(id) {
    this.lawAmendmentService.delete(id).subscribe(() => {
      this.toastr.success(`${this.item} deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteLawRelatedLink(id) {
    this.lawArticleRelatedLinksService.delete(id).subscribe(() => {
      this.toastr.success(`${this.item} deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteAllRelatedLinks(id) {
    this.lawService.deleteAllRelatedLinks(id).subscribe(() => {
      this.toastr.success(`Link deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteBlogPostApproval(id) {
    this.blogPostApprovalService.delete(id).subscribe(() => {
      this.toastr.success(`Blog Post removed`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteLawArticleVersion(id) {
    this.lawArticleVersionService.delete(id).subscribe(() => {
      this.toastr.success(`Version deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteLawArticleVersionDetails(id) {
    this.lawArticleVersionService.deleteVersionDetails(id).subscribe(() => {
      this.detector.detectChanges();
      this.toastr.success(`Version detail deleted successfully!`);
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, error => this.errorMessage(error));
  }

  deleteLawCategory(id) {
    this.lawCategoryService.delete(id, this.language).subscribe(() => {
      this.toastr.success('Category deleted successfully');
      this.isdeleted = true;
      this.bsModalRef.hide();
    }, (error) => {
      if (error.status == 403) {
        this.toastr.warning('You cannot delete this category');
        this.bsModalRef.hide();
      } else {
        this.errorMessage(error);
        this.bsModalRef.hide();
      }
    });
  }
}
