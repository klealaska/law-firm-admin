import { languageEnum } from './../../enums/languageEnum';
import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LawAmendmentService } from '../../services/law-amendment/law-amendment.service';
import { LawService } from '../../services/law/law.service';
import { ToastrService } from 'ngx-toastr';
import { TagService } from '../../services/tag/tag.service';
import { CkEditorService } from '../../services/ck-editor/ck-editor.service';

@Component({
  selector: 'app-add-edit-law-section',
  templateUrl: './add-edit-law-section.component.html',
  styleUrls: ['./add-edit-law-section.component.scss'],
})
export class AddEditLawSectionComponent implements OnInit {

  // editor section
  public Editor;
  public editorConfig;

  public title = '';
  public code = '';
  order;
  public categoryId;
  public categoryName = '';
  public content = '';
  public isOverview: boolean = false;
  public isSubmitted: boolean = false;

  public tagList = new Array();
  public tagIds = new Array();
  public chapterId;
  public itemId;
  language = languageEnum.Albaninan;

  pageType: any;
  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @Output() public submited: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-xl'
  };
  isValid: boolean;

  constructor(
    private lawService: LawService,
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
    if (this.pageType === 'edit' || this.pageType === 'fullContent') {
      this.getDataById();
    }
  }

  getTags() {
    this.tagService.getAll().subscribe((res: any) => {
      this.tagList = res;
    });
  }

  getDataById() {
    this.lawService.getById(this.itemId).subscribe((res: any) => {
      this.order = res.order;
      this.isOverview = res.isOverview;
      this.title = `${res.category.name} / ${res.title}`;
      this.code = res.code;
      this.content = res.content;
      this.tagIds = res.tagIds;
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.pageType === 'edit') {
      this.update();
    } else if (this.pageType === 'add') {
      this.add();
    }
  }

  add() {
    this.isValid = true;
    const data = {
      title: this.title,
      code: this.code !== null || this.code.length !== 0 ? this.code.trim() : '',
      content: this.content,
      categoryId: this.chapterId,
      tagIds: this.tagIds,
      isOverview: this.isOverview
    };
    this.validateStringData(this.title, 'Title');
    this.validateStringData(this.code, 'Keyword');
    if (this.isValid) {
      this.lawAmendmentService.add(data, this.language).subscribe(() => {
        this.toast.info('Section was sent to your amendments');
        this.modalRef.hide();

        this.submited.emit();
      }, (error) => {
        error.status === 400
          ? this.toast.warning(error.error.message)
          : this.toast.error('Something went wrong,try again later');
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
      tagIds: this.tagIds
    };
    this.validateStringData(this.title, 'Title');
    this.validateStringData(this.code, 'Keyword');
    if (this.isValid) {
      this.lawService.update(data).subscribe(() => {
        this.toast.success('Section updated succesfully!');
        this.modalRef.hide();

        this.submited.emit();
      }, (error) => {
        this.toast.error(error.error.message);
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
    this.categoryName = '';
    // this.chapterId = null;
    this.tagIds = new Array();
  }

  validateStringData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }
}
