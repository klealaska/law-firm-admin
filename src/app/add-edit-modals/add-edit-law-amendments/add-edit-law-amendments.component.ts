import { LawAmendmentService } from './../../services/law-amendment/law-amendment.service';
import { TagService } from './../../services/tag/tag.service';
import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { CkEditorService } from '../../services/ck-editor/ck-editor.service';

@Component({
  selector: 'app-add-edit-law-amendments',
  templateUrl: './add-edit-law-amendments.component.html',
  styleUrls: ['./add-edit-law-amendments.component.scss']
})

export class AddEditLawAmendmentsComponent implements OnInit {

  // editor section
  public Editor;
  public editorConfig;

  public title = '';
  public code = '';
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
  articleId;
  chapterId;

  public itemId;
  pageType: any;
  momentOfEdit = null;
  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @Output() public submited: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-xl'
  };
  isValid: boolean;
  isSubmitted: boolean = false;

  constructor(
    private lawAmendmentService: LawAmendmentService,
    private toast: ToastrService,
    private modalService: BsModalService,
    private tagService: TagService,
    private ckEditorService: CkEditorService
  ) {
    this.Editor = this.ckEditorService.Editor;
    this.editorConfig = this.ckEditorService.editorConfig;
  }

  ngOnInit() {
    // this.getTags();
  }

  openModal() {
    this.defaultValues();
    this.modalRef = this.modalService.show(this.template, this.config);
    if (this.pageType === 'edit') {
      this.getLawAmendmentById();
    }
  }

  getLawAmendmentById() {
    this.tagIds = new Array();
    this.lawAmendmentService.getById(this.itemId).subscribe((res: any) => {
      this.tagIds = res.tagIds;
      this.title = res.title;
      this.code = res.code;
      this.categoryId = res.categoryId;
      this.categoryName = res.categoryName;
      this.content = res.content;
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
      // lawArticleId: this.chapterId,
      id: this.itemId,
      categoryId: this.categoryId,
      title: this.title,
      content: this.content,
      code: this.code,
      tagIds: this.tagIds,
      // parentId: this.articleId
    };
    this.validateStringData(this.title, 'title');
    this.validateStringData(this.content, 'content');
    this.validateStringData(this.code, 'keyword');
    if (this.isValid) {
      this.lawAmendmentService.update(dataToUpdate).subscribe(() => {
        this.toast.success('Law Amendment updated successfully!');
        this.submited.emit();
        this.modalRef.hide();
      }, (error) => {
        error.status === 400
          ? this.toast.warning(error.error.message)
          : this.toast.error('Something went wrong,try again later');
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
    // this.chapterData = null;
    // this.articleId = null;
    this.categoryName = '';
    //  this.chapterId = null;
    this.tagIds = new Array();
    // this.momentOfEdit = null;
  }

  validateStringData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }
}


  // getAllLawArticles() {
  //   this.lawService.getAll().subscribe((res: any) => {
  //     res.forEach(law => {
  //       if (law.lawArticle.parentId == null) {
  //         if (law.lawArticle.status !== 'Created' && law.lawArticle.status !== 'Published') {
  //           this.articleList.push({ id: law.lawArticle.id, title: law.lawArticle.title, subArticles: law.subArticles, disabled: true });
  //         } else {
  //           this.articleList.push({ id: law.lawArticle.id, title: law.lawArticle.title, subArticles: law.subArticles });
  //         }
  //       }
  //     });
  //   });
  // }

  // getChaptersOnLawChange(id) {
  //   this.chapterList = new Array();
  //   this.chapterId = null;
  //   this.chapterData = null;
  //   this.articleList.forEach(law => {
  //     if (law.id === id) {
  //       law.subArticles.forEach(sub => {
  //         if (sub.status !== 'Created' && sub.status !== 'Published') {
  //           this.chapterList.push({ id: sub.id, title: sub.title, disabled: true });
  //         } else {
  //           this.chapterList.push({ id: sub.id, title: sub.title });
  //         }
  //       });
  //     }
  //   });
  // }

  // getChaptersOnEdit(id, chapterId) {
  //   this.chapterList = new Array();
  //   this.articleList.forEach(law => {
  //     if (law.id === id) {
  //       law.subArticles.forEach(sub => {
  //         this.chapterList.push({ id: sub.id, title: sub.title });
  //       });
  //     }
  //   });
  //   this.chapterId = chapterId;
  // }

  // async getDataToUpdate() {
  //   this.chapterData = await this.lawService.getById(this.chapterId).toPromise().catch(() => {
  //     this.toast.error('Something went wrong!Try again later.');
  //   });
  //   this.title = this.chapterData.title;
  //   this.code = this.chapterData.code;
  //   this.categoryName = this.chapterData.category.name;
  //   this.categoryId = this.chapterData.category.id;
  // }
  // add() {
  //   this.isValid = true;
  //   const data = {
  //     lawArticleId: this.chapterId,
  //     categoryId: this.chapterData.category.id,
  //     title: this.title,
  //     content: this.content,
  //     code: this.code,
  //     tagIds: this.tagIds,
  //     parentId: this.articleId
  //   };
  //   this.validateStringData(this.title, 'title');
  //   this.validateStringData(this.content, 'content');
  //   this.validateStringData(this.code, 'code');
  //   if (this.isValid) {
  //     this.lawAmendmentService.add(data).subscribe(() => {
  //       this.toast.success('Law amendment added successfully!');
  //       this.modalRef.hide();
  //       this.submited.emit();
  //     }, (error) => {
  //       this.toast.error(error.error.message);
  //     });
  //   }
  // }
