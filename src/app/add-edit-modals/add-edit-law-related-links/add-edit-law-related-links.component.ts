import { LawService } from './../../services/law/law.service';
import { LawArticleRelatedLinksService } from './../../services/law-article-related-links/law-article-related-links.service';
import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-edit-law-related-links',
  templateUrl: './add-edit-law-related-links.component.html',
  styleUrls: ['./add-edit-law-related-links.component.scss']
})
export class AddEditLawRelatedLinksComponent implements OnInit {

  public description = '';
  public url = '';
  public chapterId;
  public articleId;
  public sectionId;
  public itemId;
  isValid: boolean;
  isSubmitted: boolean = false;

  public pageType: any;
  public urlList = new Array();
  inputsArray = new Array(1);
  chapterList = new Array();
  articleList = new Array();
  language;

  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @Output() public submited: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-lg'
  };

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private lawArticleRelatedLinksService: LawArticleRelatedLinksService,
    private lawService: LawService
  ) { }

  ngOnInit() {
    // this.getAllLawArticles();
  }

  closeModal() {
    this.defaultValues();
    this.modalRef.hide();
  }

  openModal() {
    this.isSubmitted = false;
    this.modalRef = this.modalService.show(this.template, this.config);
    if (this.pageType === 'edit') {
      this.getDataById();
    }
  }

  getDataById() {
    this.lawArticleRelatedLinksService.getById(this.itemId).subscribe((res: any) => {
      this.description = res.description;
      this.url = res.url;
    })
  }

  getChaptersOnLawChange(id) {
    this.chapterList = new Array();
    this.chapterId = null;
    this.articleList.forEach(law => {
      if (law.id === id) {
        law.subArticles.forEach(sub => {
          this.chapterList.push({ id: sub.id, title: sub.title });
        });
      }
    });
  }

  getChaptersOnEdit(id, chapterId) {
    this.chapterList = new Array();
    this.articleList.forEach(law => {
      if (law.id === id) {
        law.subArticles.forEach(sub => {
          this.chapterList.push({ id: sub.id, title: sub.title });
        });
      }
    });
    this.chapterId = chapterId;
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
      description: this.description,
      url: this.url,
      lawArticleId: this.sectionId,
      language: this.language
    };
    this.validateStringData(this.description, 'description');
    this.validateArray(this.url, 'url');
    if (this.isValid) {
      this.lawArticleRelatedLinksService.postAdd(data).subscribe(() => {
        this.toast.success('Link added successfully!');
        this.modalRef.hide();
        this.submited.emit();

        this.defaultValues();
      }, () => {
        this.toast.error('Something went wrong!Try again later.');
      });
    } else {
      this.isSubmitted = false;
    }
  }

  update() {
    this.isValid = true;
    const dataToUpdate = {
      id: this.itemId,
      url: this.url,
      description: this.description,
      language: this.language
    };
    this.validateStringData(this.description, 'description');
    this.validateArray(this.url, 'url');
    if (this.isValid) {
      this.lawArticleRelatedLinksService.update(dataToUpdate).subscribe(() => {
        this.toast.success('Link updated successfully!');
        this.modalRef.hide();
        this.submited.emit();

        this.defaultValues();
      }, () => {
        this.toast.error('Something went wrong!Try again later.');
      });
    } else {
      this.isSubmitted = false;
    }
  }

  addInput() {
    this.inputsArray.push({});
  }

  removeInput(idx: number) {
    this.inputsArray.splice(idx, 1);
    this.urlList.splice(idx, 1);
  }

  defaultValues() {
    this.sectionId = null;
    //  this.chapterId = null;
    this.description = '';
    //  this.urlList = new Array();
    // this.inputsArray = new Array(1);
    this.url = '';
  }

  validateArray(attr, id: string) {
    if (attr.length === 0) {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  validateStringData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  validateNullData(attr, id: string) {
    if (attr == null || attr == undefined) {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }
}
