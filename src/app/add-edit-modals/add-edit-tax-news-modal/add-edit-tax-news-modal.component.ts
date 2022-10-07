import { languageEnum } from './../../enums/languageEnum';
import { element } from 'protractor';
import { Component, OnInit, TemplateRef, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/ngx-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TaxNewsService } from '../../services/tax-news/tax-news.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-edit-tax-news-modal',
  templateUrl: './add-edit-tax-news-modal.component.html',
  styleUrls: ['./add-edit-tax-news-modal.component.scss']
})
export class AddEditTaxNewsModalComponent implements OnInit {

  public title = '';
  public publishedDate: Date;
  public language = languageEnum.Albaninan;
  albanian = languageEnum.Albaninan;
  english = languageEnum.English;
  public itemId;
  isValid: boolean;
  isSubmitted: boolean = false;

  filePdfAL;
  filePdfEN;
  fileNameAL;
  fileNameEN;
  imagePath;
  imageType = '';
  fileType;
  file: [null];
  editFile: boolean = true;
  removeUpload: boolean = false;
  uploadedFile: any;
  pageType: any;

  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @ViewChild('fileInput', { static: false }) el: ElementRef;
  @Output() public submited: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-xl'
  };

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private taxNewsService: TaxNewsService,
    private spinner: NgxSpinnerService,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
  }

  openModal() {
    this.isSubmitted = false;
    this.defaultValues();
    this.modalRef = this.modalService.show(this.template, this.config);
    if (this.pageType === 'edit') {
      this.getData();
    }
  }

  getData() {
    this.taxNewsService.getById(this.itemId, this.language).subscribe((res: any) => {
      this.title = res.title;
      this.publishedDate = new Date(res.publishedDate);
      if (res.imageUrl != null) {
        this.imagePath = 'data:image/jpeg;base64,' + res.imageUrl;
      }
      if (res.taxNewsAttachments.length > 0) {
        res.taxNewsAttachments.forEach(attch => {
          if (attch.language === this.albanian && attch.url !== null) {
            this.fileNameAL = attch.url;
          } else if (attch.language === this.english && attch.url !== null) {
            this.fileNameEN = attch.url;
          }
        });
      }
      this.language = res.language;
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
      publishedDate: this.publishedDate,
      imageUrl: this.imagePath == null ? null : this.imagePath.split(',')[1],
      taxNewsAttachments: [
        { content: this.filePdfAL == null ? null : this.splitBase64(this.filePdfAL), language: this.albanian, name: this.fileNameAL },
        { content: this.filePdfEN == null ? null : this.splitBase64(this.filePdfEN), language: this.english, name: this.fileNameEN }
      ],
      language: this.language
    };
    this.validateStringData(this.title, 'Title');
    this.validateStringData(this.language, 'Language');
    if (this.imagePath != null) {
      this.validateImage(this.imageType);
    }
    if (this.fileType.length !== 0) {
      this.validatePdfFiles(this.fileType);
    }
    if (this.isValid && this.publishedDate != null) {
      this.spinner.show();
      this.taxNewsService.postAdd(data, this.language).subscribe(() => {
        this.toast.success('Tax-News added successfully!');
        this.modalRef.hide();
        this.submited.emit();

        this.spinner.hide();
      }, error => {
        this.toast.error('Error! Something went wrong, try again later.');
        this.modalRef.hide();
        this.spinner.hide();
      });
    } else {
      this.isSubmitted = false;
      this.toast.warning(`Please choose a Publish Date!`);
    }
  }

  update() {
    this.isValid = true;
    const dataToUpdate = {
      id: this.itemId,
      title: this.title,
      publishedDate: this.publishedDate,
      imageUrl: this.imagePath == null ? null : this.imagePath.split(',')[1],
      taxNewsAttachments: [
        { content: this.filePdfAL == null ? null : this.splitBase64(this.filePdfAL), language: this.albanian, name: this.fileNameAL },
        { content: this.filePdfEN == null ? null : this.splitBase64(this.filePdfEN), language: this.english, name: this.fileNameEN }
      ],
      language: this.language
    };
    this.validateStringData(this.title, 'Title');
    this.validateStringData(this.language, 'Language');
    if (this.imageType.length !== 0) {
      this.validateImage(this.imageType);
    }
    if (this.fileType.length !== 0) {
      this.validatePdfFiles(this.fileType);
    }
    if (this.isValid && this.publishedDate != null) {
      this.spinner.show();
      this.taxNewsService.update(dataToUpdate, this.language).subscribe(() => {
        this.toast.success('Tax-News updated successfully!');
        this.modalRef.hide();
        this.submited.emit();

        this.spinner.hide();
      }, () => {
        this.toast.error('Something went wrong!Try again later.');
        this.modalRef.hide();
        this.spinner.hide();
      });
    } else {
      this.isSubmitted = false;
      this.toast.warning('Please choose a Publish Date!');
    }
  }

  uploadImage(event) {
    this.imageType = '';
    const reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.imageType = event.target.files[0].type;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file
      reader.onload = () => {
        this.imagePath = reader.result;
        file = reader.result;
        this.editFile = false;
        this.removeUpload = true;
      };
      this.cd.markForCheck();
    }
  }

  onUpload(event) {
    const reader = new FileReader(); // HTML5 FileReader API
    let file = event.files[0];
    this.uploadedFile = file;
    this.imageType = event.files[0].type;
    if (event.files && event.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file
      reader.onload = () => {
        this.imagePath = reader.result;
        file = reader.result;
        this.editFile = false;
        this.removeUpload = true;
      };
      this.cd.markForCheck();
    }
  }

  uploadPdf(event, lang: string) {
    const reader = new FileReader(); // HTML5 FileReader API
    let file = event.files[0];
    this.fileType = event.files[0].type;
    if (event.files && event.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file
      reader.onload = () => {
        if (lang === 'AL') {
          this.filePdfAL = reader.result;
          this.fileNameAL = file.name;
        } else if (lang === 'EN') {
          this.filePdfEN = reader.result;
          this.fileNameEN = file.name;
        }
        file = reader.result;
        this.editFile = false;
        this.removeUpload = true;
      };
      this.cd.markForCheck();
    }
  }

  uploadFiles(event, lang: string) {
    const reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.fileType = event.target.files[0].type;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file
      reader.onload = () => {
        if (lang === 'sq-AL') {
          this.filePdfAL = reader.result;
          this.fileNameAL = file.name;
        } else if (lang === 'EN') {
          this.filePdfEN = reader.result;
          this.fileNameEN = file.name;
        }
        file = reader.result;
        this.editFile = false;
        this.removeUpload = true;
      };
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded image
  removeUploadedImage() {
    this.imagePath = null;
    this.editFile = true;
    this.removeUpload = false;
    this.file = [null];
    this.uploadedFile = null;
  }

  // Function to remove uploaded file
  removeUploadedPdfFile(language: string) {
    this.fileType = '';
    if (language === 'AL') {
      this.fileNameAL = null;
      this.filePdfAL = null;
    } else if (language === 'EN') {
      this.fileNameEN = null;
      this.filePdfEN = null;
    }
    this.editFile = true;
    this.removeUpload = false;
  }

  splitBase64(file) {
    return file.split(',')[1];
  }

  validateStringData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  validateImage(fileType: string) {
    const regex = new RegExp(/([a-zA-Z0-9\s_\\.\-\(\):\/])+(.png|.jpe?g)$/i);
    const valid = regex.test(fileType);
    if (!valid) {
      this.isValid = false;
      this.toast.warning('Image is not valid!');
    }
  }

  validatePdfFiles(fileType: any) {
    const regex = new RegExp(/([a-zA-Z0-9\s_\\.\-\(\):\/])+(.pdf)$/i);
    const valid = regex.test(fileType);
    if (!valid) {
      this.isValid = false;
      this.toast.warning('Pdf file is not valid!');
    }
  }

  defaultValues() {
    this.title = '';
    this.publishedDate = null;
    this.fileNameAL = null;
    this.fileNameEN = null;
    this.imagePath = null;
    this.filePdfAL = null;
    this.filePdfEN = null;
    this.imageType = '';
    this.fileType = '';
  }

  openNewWindow(path: string) {
    window.open(path);
  }

  showPreviewPdf(filePath: string) {
    return `${filePath}`;
  }
}
