import { Component, OnInit } from '@angular/core';
import { LawAmendmentService } from '../../services/law-amendment/law-amendment.service';
import { ToastrService } from 'ngx-toastr';
import { TagService } from '../../services/tag/tag.service';
import { CkEditorService } from '../../services/ck-editor/ck-editor.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as htmldiff from './../../config-files/text-diff-config-file/htmldiff.js';

@Component({
  selector: 'app-law-in-amendment',
  templateUrl: './law-in-amendment.component.html',
  styleUrls: ['./law-in-amendment.component.scss']
})
export class LawInAmendmentComponent implements OnInit {
  // editor section
  public Editor;
  public editorConfig;

  // law amendment data
  public title = '';
  public code = '';
  public order;
  public categoryId;
  public categoryName = '';
  public content = '';

  public articleList = new Array();
  public chapterList = new Array();
  public subArticlesList = new Array();
  public tagList = new Array();
  public tagIds = new Array();
  public chapterData: any;
  public sectionData: any;
  isOverview;
  articleId;
  chapterId;
  initialText;
  differences;
  isSubmitted: boolean = false;

  public itemId;
  pageType: any;
  momentOfEdit = null;
  isValid: boolean;
  isCollapsed;

  constructor(
    private lawAmendmentService: LawAmendmentService,
    private toast: ToastrService,
    private tagService: TagService,
    private ckEditorService: CkEditorService,
    private location: Location,
    private route: ActivatedRoute,
  ) {
    this.Editor = this.ckEditorService.Editor;
    this.editorConfig = this.ckEditorService.editorConfig;
    this.route.queryParams.subscribe(params => {
      this.pageType = params['pageType'];
      this.chapterId = params['chapterId'];
      this.itemId = params['itemId'];
    });
  }

  ngOnInit() {
    this.defaultValues();
    if (this.pageType === 'edit') {
      this.getLawAmendmentById();
    }
  }

  getLawAmendmentById() {
    // this.tagIds = new Array();
    this.categoryName = '';
    this.lawAmendmentService.getById(this.itemId).subscribe((res: any) => {
      this.order = res.order;
      this.isOverview = res.isOverview;
      this.tagIds = res.tagIds;
      this.title = res.title;
      this.code = res.code;
      this.categoryId = res.categoryId;
      this.categoryName = res.categoryName;
      this.content = res.content;
      this.initialText = res.lawArticleContent != null ? res.lawArticleContent : '';
      this.differences = this.compareHtml();
    }, (error) => {
      error.status === 400
        ? this.toast.warning(error.error.message)
        : this.toast.error('Something went wrong,try again later');
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
        this.toast.success('Law Amendment updated successfully!');
        this.goBack();
      }, (error) => {
        error.status === 400
          ? this.toast.warning(error.error.message)
          : this.toast.error('Something went wrong,try again later');
      });
    } else {
      this.isSubmitted = false;
    }
  }

  compareHtml() {
    return htmldiff(this.initialText, this.content);
  }

  onChangeContent() {
    this.differences = this.compareHtml();
  }

  defaultValues() {
    this.title = '';
    this.content = '';
    this.code = '';
    this.categoryName = '';
    this.tagIds = new Array();
    this.differences = null;
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

  goBack() {
    this.location.back();
  }
}
