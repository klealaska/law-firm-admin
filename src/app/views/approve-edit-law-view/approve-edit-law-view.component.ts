import { languageEnum } from './../../enums/languageEnum';
import { Component, OnInit } from '@angular/core';
import { LawAmendmentService } from '../../services/law-amendment/law-amendment.service';
import { LawService } from '../../services/law/law.service';
import { ToastrService } from 'ngx-toastr';
import { TagService } from '../../services/tag/tag.service';
import { UserService } from '../../services/user/user.service';
import { CkEditorService } from '../../services/ck-editor/ck-editor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as htmldiff from './../../config-files/text-diff-config-file/htmldiff.js';

@Component({
  selector: 'app-approve-edit-law-view',
  templateUrl: './approve-edit-law-view.component.html',
  styleUrls: ['./approve-edit-law-view.component.scss']
})
export class ApproveEditLawViewComponent implements OnInit {

  public articleId = '';
  public title = '';
  public content = '';
  public code = '';
  public order;
  public articleTitle = '';
  public tagIds = new Array();
  public authorList = new Array();
  public articleList = new Array();
  public categoryName = '';
  public editor = '';
  public categoryId = null;

  lawType;
  modifiedBy;
  isValid: boolean;
  isSubmitted: boolean;
  isCollapsed = false;
  public tagList = new Array();
  isOverview;
  public itemId;
  pageType: any;

  // editor section
  public Editor;
  public editorConfig;
  initialText;
  differences;
  language = languageEnum.Albaninan;

  constructor(
    private lawAmendmentService: LawAmendmentService,
    private lawService: LawService,
    private toast: ToastrService,
    private tagService: TagService,
    private userService: UserService,
    private ckEditorService: CkEditorService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) {
    this.route.queryParams.subscribe(params => {
      this.pageType = params['pageType'];
      this.lawType = params['lawType'];
      this.itemId = params['itemId'];
      this.language = params['language'];
    });
    this.Editor = this.ckEditorService.Editor;
    this.editorConfig = this.ckEditorService.editorConfig;
  }

  ngOnInit() {
    // this.getTags();
    this.isSubmitted = false;
    this.getAuthors();
    if (this.pageType === 'edit') {
      this.getById();
    }
  }

  getById() {
    if (this.lawType === 'pendingApproval') {
      this.getLawAmendmentById();
    } else if (this.lawType === 'deletionApproval' || this.lawType === 'fullContent') {
      this.getLawArticleById();
    }
  }

  getLawAmendmentById() {
    this.lawAmendmentService.getById(this.itemId, this.language).subscribe((res: any) => {
      this.isOverview = res.isOverview;
      this.order = res.order;
      this.tagIds = res.tagIds;
      this.title = res.title;
      this.code = res.code;
      this.categoryId = res.categoryId;
      this.categoryName = res.categoryName;
      this.content = res.content;
      this.editor = res.editor;
      this.initialText = res.lawArticleContent != null ? res.lawArticleContent : '';
      this.differences = this.compareHtml();
    }, (error) => {
      error.status === 400
        ? this.toast.warning(error.error.message)
        : this.toast.error('Something went wrong, try again later');
    });
  }

  compareHtml() {
    return htmldiff(this.initialText, this.content);
  }

  onChangeContent() {
    this.differences = this.compareHtml();
  }

  getLawArticleById() {
    this.lawService.getById(this.itemId, this.language).subscribe((res: any) => {
      // this.tagIds = res.tagIds;
      this.isOverview = res.isOverview;
      this.modifiedBy = res.modifiedBy != null ? res.modifiedBy : null;
      this.categoryName = res.category.name;
      this.title = res.title;
      this.code = res.code;
      this.categoryId = res.categoryId;
      this.order = res.order;
      this.content = res.content;
      this.editor = res.editor;
    }, (error) => {
      error.status === 400
        ? this.toast.warning(error.error.message)
        : this.toast.error('Something went wrong, try again later');
    });
  }

  getTags() {
    this.tagService.getAll().subscribe((res: any) => {
      this.tagList = res;
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.pageType === 'edit') {
      this.update();
    }
  }

  update() {
    this.isValid = true;
    const dataToUpdate = {
      id: this.itemId,
      categoryId: this.categoryId,
      title: this.title,
      content: this.content,
      code: this.code,
      editor: this.editor,
      tagIds: this.tagIds,
      isOverview: this.isOverview,
      order: this.order
    };
    this.validateStringData(this.title, 'title');
    this.validateStringData(this.content, 'content');
    this.validateStringData(this.code, 'keyword');
    this.validateNrData(this.order, 'order');
    if (this.isValid) {
      this.lawAmendmentService.update(dataToUpdate).subscribe(() => {

        this.getLawAmendmentById();
        this.toast.success('Law updated successfully!');
        this.goBack();
      }, (error) => {
        this.toast.error(error.error.message);
      });
    } else {
      this.isSubmitted = false;
    }
  }

  defaultValues() {
    this.title = '';
    this.content = '';
    this.code = '';
    this.articleId = null;
    this.categoryName = '';
    this.tagIds = new Array();
    this.editor = null;
  }

  validateStringData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  validateNrData(attr, id: string) {
    if (attr == null) {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  getAuthors() {
    this.userService.getSystemUsers().subscribe((res: any) => {
      this.authorList = res;
    }, () => {
      this.toast.error('Cannot get authors!Try again later.');
    });
  }

  ignoreApproval() {
    this.lawAmendmentService.ignore(this.itemId, this.language).subscribe(() => {
      this.toast.success('Law amendment was refused.');
      this.goBack();
    }, () => {
      this.toast.error('Something went wrong!Try again later');
    });
  }

  ignoreDeletion() {
    this.lawService.denyDeletion(this.itemId, this.language).subscribe(() => {
      this.toast.success('Law deletion was refused.');
      this.goBack();
    }, () => {
      this.toast.error('Something went wrong!Try again later');
    });
  }

  goBack() {
    this.router.navigate(['lawApproval']);
  }
}
