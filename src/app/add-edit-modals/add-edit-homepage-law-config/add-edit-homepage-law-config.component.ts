import { environment } from './../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { HomepageLawConfigurationService } from '../../services/homepage-law-configuration/homepage-law-configuration.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';

enum HomepageConfigENEnum {
  FISCAL_LEGISLATION = 0,
  ACCOUNTING = 1,
  WORK_CODE = 2,
  CUSTOM = 3,
  TAX_NEWS = 4,
  BLOG_POST = 5
}

enum HomepageConfigALEnum {
  LEGJISLACIONI_FISKAL = 0,
  KONTABEL = 1,
  KODI_I_PUNES = 2,
  DOGANA = 3,
  LAJME_DHE_NJOFTIME = 4,
  KENDI_I_DISKUTIMEVE = 5
}

@Component({
  selector: 'app-add-edit-homepage-law-config',
  templateUrl: './add-edit-homepage-law-config.component.html',
  styleUrls: ['./add-edit-homepage-law-config.component.scss']
})
export class AddEditHomepageLawConfigComponent implements OnInit {

  public title = '';
  public name;
  public description = '';
  public link = '';
  public color;
  public imagePath;
  public isVisible: boolean = true;
  public language;
  public uploadImg = null;
  isSubmitted: boolean = false;
  configData = new Array();
  dbNameList = new Array();

  imageType = '';
  file: [null];
  editFile: boolean = true;
  removeUpload: boolean = false;
  showCancel: boolean;
  showUpload: boolean;

  public itemId;
  nameList = [

  ];
  isValid: boolean;
  colorList = [
    { name: 'Red' },
    { name: 'Blue' },
    { name: 'Yellow' },
    { name: 'LightBlue' },
    { name: 'Transparent' }
  ];

  pageType: any;
  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @Output() public submited: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-xl'
  };

  constructor(
    private configurationService: HomepageLawConfigurationService,
    private cd: ChangeDetectorRef,
    private toast: ToastrService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getLawNameFromDb();
  }

  openModal() {
    this.defaultValues();
    this.modalRef = this.modalService.show(this.template, this.config);
    if (this.pageType === 'add') {
      this.checkNameList();
    }
    if (this.pageType === 'edit') {
      this.getDataById();
      this.nameList = [
        { name: 'Fiscal Legislation', id: HomepageConfigENEnum.FISCAL_LEGISLATION },
        { name: 'Accounting Standards', id: HomepageConfigENEnum.ACCOUNTING },
        { name: 'Labor Code', id: HomepageConfigENEnum.WORK_CODE },
        { name: 'Customs legislation', id: HomepageConfigENEnum.CUSTOM },
        { name: 'Tax News', id: HomepageConfigENEnum.TAX_NEWS },
        { name: 'Blog Post', id: HomepageConfigENEnum.BLOG_POST }
      ];
    }
    if (this.pageType === 'translate') {
      this.getCommonData();
      this.nameList = [
        { name: 'Fiscal Legislation', id: HomepageConfigENEnum.FISCAL_LEGISLATION },
        { name: 'Accounting Standards', id: HomepageConfigENEnum.ACCOUNTING },
        { name: 'Labor Code', id: HomepageConfigENEnum.WORK_CODE },
        { name: 'Customs legislation', id: HomepageConfigENEnum.CUSTOM },
        { name: 'Tax News', id: HomepageConfigENEnum.TAX_NEWS },
        { name: 'Blog Post', id: HomepageConfigENEnum.BLOG_POST }
      ];
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.pageType === 'edit') {
      this.update();
    } else if (this.pageType === 'add') {
      this.add();
    } else if (this.pageType === 'translate') {
      this.addOtherLanguage();
    }
  }

  getCommonData() {
    this.configurationService.getById(this.itemId).subscribe((res: any) => {
      this.name = this.getNameToEdit(res.lawName);
      this.imagePath = res.imageUrl;
      this.uploadImg = res.imageUrl;
      this.color = res.colorOverlay;
      this.spinner.hide();
    }, () => {
      this.toast.error('Error!Something went wrong.');
      this.spinner.hide();
      this.modalRef.hide();
    });
  }

  getDataById() {
    this.spinner.show();
    this.configurationService.getById(this.itemId, this.language).subscribe((res: any) => {
      this.name = this.getNameToEdit(res.lawName);
      this.title = res.title;
      this.description = res.description;
      this.link = res.link;
      this.color = res.colorOverlay;
      this.isVisible = res.isVisible;
      this.imagePath = res.imageUrl;
      this.uploadImg = res.imageUrl;
      this.spinner.hide();
    }, () => {
      this.toast.error('Error!Something went wrong.');
      this.spinner.hide();
      this.modalRef.hide();
    });
  }

  add() {
    this.isValid = true;
    const data = {
      title: this.title,
      name: this.name,
      description: this.description,
      link: this.link,
      colorOverlay: this.color,
      isVisible: this.isVisible,
      imageUrl: this.imagePath == null ? null : this.imagePath.split(',')[1]
    };
    this.validateStringData(this.title, 'title');
    this.validateStringData(this.description, 'description');
    this.validateNullOrUndifinedData(this.name, 'name');
    this.validateNullOrUndifinedData(this.color, 'color');
    if (this.imagePath != null) {
      this.validateImage(this.imageType);
    }
    if (this.isValid) {
      this.configurationService.postAdd(data).subscribe(() => {
        this.toast.success('Configuration added successfully!');
        this.modalRef.hide();
        this.submited.emit();
        this.getLawNameFromDb();
      }, error => {
        this.toast.error('Error! Something went wrong, try again later.');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
  }

  addOtherLanguage() {
    this.isValid = true;
    const data = {
      id: this.itemId,
      title: this.title,
      description: this.description,
      link: this.link,
      colorOverlay: this.color,
      imageUrl: this.sendImage(),
      language: this.language
    };
    this.validateStringData(this.title, 'title');
    this.validateStringData(this.description, 'description');
    this.validateNullOrUndifinedData(this.color, 'color');
    if (this.isValid) {
      this.configurationService.postAddTranslation(data, 'en-US').subscribe(() => {
        this.toast.success('Configuration translated successfully!');
        this.modalRef.hide();
        this.submited.emit();
        this.getLawNameFromDb();
      }, error => {
        this.toast.error('Error! Something went wrong, try again later.');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
  }

  sendImage() {
    if (this.imagePath == null) {
      return null;
    } else {
      if (this.imagePath.includes(environment.displayPreviewPath)) {
        return this.imagePath;
      } else {
        return this.imagePath.split(',')[1];
      }
    }
  }

  update() {
    this.isValid = true;
    const dataToUpdate = {
      id: this.itemId,
      title: this.title,
      name: this.name,
      description: this.description,
      link: this.link,
      colorOverlay: this.color,
      isVisible: this.isVisible,
      imageUrl: this.sendImage()
    };
    this.validateStringData(this.title, 'title');
    this.validateStringData(this.description, 'description');
    this.validateNullOrUndifinedData(this.color, 'color');
    // if (this.imageType.length != 0) {
    //   this.validateImage(this.imageType);
    // }
    if (this.isValid) {
      this.configurationService.update(dataToUpdate, this.language).subscribe(() => {
        this.toast.success('Configuration updated successfully!');
        this.modalRef.hide();
        this.submited.emit();
      }, error => {
        this.toast.error('Error! Something went wrong, try again later.');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
  }

  uploadImage(event) {
    const reader = new FileReader(); // HTML5 FileReader API
    let file = event.files[0];
    this.uploadImg = file;
    this.imageType = event.files[0].type;
    if (event.files && event.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePath = reader.result;
        file = reader.result;
        this.editFile = false;
        this.removeUpload = true;
      };
      this.cd.markForCheck();
    }
  }

  removeFile() {
    this.imagePath = null;
  }
  // Function to remove uploaded image
  removeUploadedImage() {
    this.imageType = '';
    this.imagePath = null;
    this.editFile = true;
    this.removeUpload = false;
    this.file = [null];
  }

  getLawNameFromDb() {
    this.configurationService.getAll().subscribe((res: any) => {
      res.body.forEach(name => {
        this.configData.push(name.lawName);
      });
    });
  }

  checkNameList() {
    let fiscal = {};
    let code = {};
    let accounting = {};
    let custom = {};
    let tax = {};
    let blog = {};

    fiscal = this.configData.includes('FISCAL_LEGISLATION') ?
      { name: 'Fiscal Legislation', id: HomepageConfigENEnum.FISCAL_LEGISLATION, disabled: true } :
      { name: 'Fiscal Legislation', id: HomepageConfigENEnum.FISCAL_LEGISLATION };

    accounting = this.configData.includes('ACCOUNTING') ?
      { name: 'Accounting Standards', id: HomepageConfigENEnum.ACCOUNTING, disabled: true } :
      { name: 'Accounting Standards', id: HomepageConfigENEnum.ACCOUNTING };

    code = this.configData.includes('WORK_CODE') ?
      { name: 'Labor Code', id: HomepageConfigENEnum.WORK_CODE, disabled: true } :
      { name: 'Labor Code', id: HomepageConfigENEnum.WORK_CODE };

    custom = this.configData.includes('CUSTOM') ?
      { name: 'Customs legislation', id: HomepageConfigENEnum.CUSTOM, disabled: true } :
      { name: 'Customs legislation', id: HomepageConfigENEnum.CUSTOM };

    tax = this.configData.includes('TAX_NEWS') ?
      { name: 'Tax News', id: HomepageConfigENEnum.TAX_NEWS, disabled: true } :
      { name: 'Tax News', id: HomepageConfigENEnum.TAX_NEWS };

    blog = this.configData.includes('BLOG_POST') ?
      { name: 'Blog post', id: HomepageConfigENEnum.BLOG_POST, disabled: true } :
      { name: 'Blog post', id: HomepageConfigENEnum.BLOG_POST };

    this.nameList = [
      accounting,
      fiscal,
      code,
      custom,
      tax,
      blog
    ];
  }

  getNameToEdit(name) {
    switch (name) {
      case 'FISCAL_LEGISLATION':
        return HomepageConfigENEnum.FISCAL_LEGISLATION;
      case 'ACCOUNTING':
        return HomepageConfigENEnum.ACCOUNTING;
      case 'WORK_CODE':
        return HomepageConfigENEnum.WORK_CODE;
      case 'CUSTOM':
        return HomepageConfigENEnum.CUSTOM;
      case 'TAX_NEWS':
        return HomepageConfigENEnum.TAX_NEWS;
      case 'BLOG_POST':
        return HomepageConfigENEnum.BLOG_POST;
      default:
        break;
    }
  }

  defaultValues() {
    this.isSubmitted = false;
    this.title = '';
    this.name = null;
    this.description = '';
    this.link = '';
    this.color = null;
    this.imagePath = null;
    this.uploadImg = null;
    this.imageType = '';
    this.isVisible = true;
    this.getLawNameFromDb();
  }

  switchEvent(event) {
    this.isVisible = event.target.checked;
  }

  validateImage(fileType: string) {
    const regex = new RegExp(/([a-zA-Z0-9\s_\\.\-\(\):\/])+(.png|.jpe?g)$/i);
    const valid = regex.test(fileType);
    if (!valid) {
      this.isValid = false;
      this.toast.warning('Image is not valid!');
    }
  }

  validateStringData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  validateNullOrUndifinedData(attr, id: string) {
    if (attr == null || attr === undefined) {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }
}
