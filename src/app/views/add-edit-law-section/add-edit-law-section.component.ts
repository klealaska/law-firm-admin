import { LawCategoryService } from './../../services/law-category/law-category.service';
import { languageEnum } from './../../enums/languageEnum';
import { Component, OnInit } from '@angular/core';
import { LawService } from '../../services/law/law.service';
import { LawAmendmentService } from '../../services/law-amendment/law-amendment.service';
import { ToastrService } from 'ngx-toastr';
import { TagService } from '../../services/tag/tag.service';
import { CkEditorService } from '../../services/ck-editor/ck-editor.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-law-section',
  templateUrl: './add-edit-law-section.component.html',
  styleUrls: ['./add-edit-law-section.component.scss']
})
export class AddEditLawSectionComponent implements OnInit {

  // editor section
  public Editor;
  public editorConfig;

  // law section data
  public title = '';
  public code = '';
  public order;
  public categoryId;
  public categoryName = '';
  public lawArticleName = '';
  public content = '';
  public initialText = null;
  public isOverview: boolean = false;
  public isSubmitted: boolean = false;

  public tagList = new Array();
  public tagIds = new Array();
  public chapterId;
  public lawArticleId;
  public itemId;
  public fullPath;

  isValid: boolean;
  pageType: any;
  isCollapsed = false;
  isDisabled = false;

  language;
  albanian = languageEnum.Albaninan;
  english = languageEnum.English;

  constructor(
    private lawService: LawService,
    private lawAmendmentService: LawAmendmentService,
    private lawCategoryService: LawCategoryService,
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
      this.lawArticleId = params['lawArticleId'];
      this.itemId = params['itemId'];
      this.language = params['language'];
    });
  }

  ngOnInit() {
    // this.getTags();
    this.defaultValues();
    if (this.pageType === 'edit' || this.pageType === 'fullContent') {
      this.isDisabled = true;
      this.getDataById();
    } else if (this.pageType === 'translate') {
      this.getDataForTranslation();
    } else if (this.pageType === 'add') {
      this.getChapterData();
    }
  }

  getTags() {
    this.tagService.getAll().subscribe((res: any) => {
      this.tagList = res;
    });
  }

  getDataForTranslation() {
    this.lawArticleName = '';
    this.lawService.getById(this.lawArticleId, this.albanian).subscribe((res: any) => {
      this.chapterId = res.category.id;
      this.lawArticleName = res.title;
      this.categoryName = res.category.name;
      this.isOverview = res.isOverview;
      this.tagIds = res.tagIds;
      this.order = res.order;
    });
  }

  getDataById() {
    this.lawArticleName = '';
    this.lawService.getById(this.itemId).subscribe((res: any) => {
      this.categoryName = res.category.name;
      this.lawArticleName = res.title;
      this.title = res.title;
      this.isOverview = res.isOverview;
      this.code = res.code;
      this.content = res.content;
      this.tagIds = res.tagIds;
      this.language = res.language;
    });
  }

  getChapterData() {
    this.lawCategoryService.getById(this.chapterId, this.language).subscribe((res: any) => {
      this.fullPath = res.fullPath;
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.pageType === 'edit') {
      this.update();
    } else if (this.pageType === 'add') {
      this.add();
    } else if (this.pageType === 'translate') {
      this.translate();
    }
  }

  add() {
    this.isValid = true;
    const lawAmendment = {
      title: this.title,
      code: this.code !== null || this.code.length !== 0 ? this.code.trim() : '',
      content: this.content,
      categoryId: this.chapterId,
      lawArticleId: this.lawArticleId,
      tagIds: this.tagIds,
      isOverview: this.isOverview,
      language: this.language,
      order: this.order
    };
    const lawArticle = {
      code: this.code !== null || this.code.length !== 0 ? this.code.trim() : '',
      categoryId: this.chapterId,
      language: this.language,
      order: this.order
    };
    this.validateStringData(this.title.trim(), 'title');
    this.validateStringData(this.code.trim(), 'keyword');
    this.validateNrData(this.order, 'order');
    if (this.isValid) {
      this.lawService.postAdd(lawArticle, this.language).toPromise().then((res: any) => {
        lawAmendment.lawArticleId = res.id;
        this.lawAmendmentService.add(lawAmendment, this.language).subscribe(() => {
          this.toast.info('Section was sent to your amendments');
          this.goBack();
        }, (error) => {
          this.errorMessage(error);
        });
      }).catch((error) => {
        this.errorMessage(error);
      });
    } else {
      this.isSubmitted = false;
    }
  }

  translate() {
    this.isValid = true;
    const lawAmendment = {
      title: this.title,
      code: this.code !== null || this.code.length !== 0 ? this.code.trim() : '',
      content: this.content,
      categoryId: this.chapterId,
      lawArticleId: this.lawArticleId,
      tagIds: this.tagIds,
      isOverview: this.isOverview,
      language: this.language,
      order: this.order
    };
    const lawArticle = {
      id: this.lawArticleId,
      code: this.code !== null || this.code.length !== 0 ? this.code.trim() : '',
      categoryId: this.chapterId
    };
    this.validateStringData(this.title.trim(), 'title');
    this.validateStringData(this.code.trim(), 'keyword');
    this.validateNrData(this.order, 'order');
    if (this.isValid) {
      this.lawService.addTranslation(lawArticle, this.language).toPromise().then((res: any) => {
        lawAmendment.lawArticleId = res.id;
        this.lawAmendmentService.add(lawAmendment, this.language).subscribe(() => {
          this.toast.info('Section was sent to your amendments');
          this.goBack();
        }, (error) => {
          this.errorMessage(error);
        });
      }).catch((error) => {
        this.errorMessage(error);
      });
    } else {
      this.isSubmitted = false;
    }
  }

  update() {
    this.isValid = true;
    const data = {
      id: this.itemId,
      title: this.title,
      code: this.code !== null || this.code.length !== 0 ? this.code.trim() : '',
      content: this.content,
      categoryId: this.chapterId,
      tagIds: this.tagIds,
      language: this.language,
      isOverview: this.isOverview,
      order: this.order
    };
    this.validateStringData(this.title, 'title');
    this.validateStringData(this.code, 'keyword');
    this.validateNrData(this.order, 'order');
    if (this.isValid) {
      this.lawService.update(data).subscribe(() => {
        this.toast.success('Section updated succesfully!');
      }, (error) => {
        this.errorMessage(error);
      });
    } else {
      this.isSubmitted = false;
    }
  }

  defaultValues() {
    this.isSubmitted = false;
    this.title = '';
    this.content = '';
    this.code = '';
    this.order = null;
    this.categoryName = '';
    this.tagIds = new Array();
  }

  validateStringData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    } else {
      if (id.toLowerCase() == 'keyword') {
        let regex = new RegExp('^(\\d|\\w)+$');
        let result = regex.test(attr);
        if (!result) {
          this.isValid = false;
          this.toast.warning(`Please set a valid Keyword!`);
        }
      }
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

  errorMessage(error) {
    error.status === 400 ?
      this.toast.warning(error.error.message)
      : this.toast.error('Something went wrong,try again later');
  }
}
