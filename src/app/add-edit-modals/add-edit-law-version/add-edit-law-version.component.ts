import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { LawArticleVersionService } from '../../services/law-article-version/law-article-version.service';
import { ToastrService } from 'ngx-toastr';
import { LawCategoryService } from '../../services/law-category/law-category.service';
import { take } from 'rxjs/operators';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-add-edit-law-version',
  templateUrl: './add-edit-law-version.component.html',
  styleUrls: ['./add-edit-law-version.component.scss']
})
export class AddEditLawVersionComponent implements OnInit {

  versionId;
  isValid;

  // version
  public lawNumber;
  public lawName;
  public lawUrl;
  public versionDate: Date;

  public language;
  public lawArticleVersionDetails = [];

  // end of version
  sectionUrl;
  sectionDescription;
  isSubmitted: boolean = false;

  // Law Categories
  public parentList = new Array();
  public parentId;
  public lawList = new Array();
  public lawId;
  public chapterList = new Array();
  public chapterId;

  inputsArray = new Array(1);
  inputsArrayElements = 0;
  sectionUrlList = new Array();
  sectionDescriptionList = new Array();

  @Input() pageType: any;
  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @Output() public submited: EventEmitter<any> = new EventEmitter();
  @Output() public closeModal: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-lg'
  };

  constructor(private modalService: BsModalService,
    private toast: ToastrService,
    private versionService: LawArticleVersionService,
    private lawCategoryService: LawCategoryService,
  ) { }

  ngOnInit() {
    if (this.pageType === 'edit') {
      this.modalService.onShow.subscribe(() => {
        this.getData();
      });
    }
  }

  openModal() {
    this.isSubmitted = false;
    if (this.pageType === 'edit') {
      this.modalService.onShow
        .pipe(take(1))
        .subscribe(() => {
          this.getData();
        });
    } else if (this.pageType === 'add') {
      this.modalService.onShow
        .subscribe(() => {
          this.defaultValues();
          this.inputsArray = new Array(1);
        });
    }
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  getData() {
    this.sectionDescriptionList = [];
    this.sectionUrlList = [];
    this.versionService.getVersionById(this.versionId).subscribe((res: any) => {
      this.fillData(res);
      this.inputsArray = res.lawArticleVersionDetails;
      this.inputsArrayElements = this.inputsArray.length;
      this.inputsArray.forEach(element => {
        this.sectionDescriptionList.push(element.description);
        this.sectionUrlList.push(element.url);
      });
    });
  }

  getLawGroupAndLaw() {
    this.lawCategoryService.getAllMainCategories().subscribe((res: any) => {
      this.parentList = res;
    });
    this.lawCategoryService.getLawsByMainCategoryId(this.parentId).subscribe((res: any) => {
      this.lawList = res;
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
    this.concatData(this.inputsArray, this.sectionDescriptionList, this.sectionUrlList);
    const data = {
      lawName: this.lawName,
      lawNumber: this.lawNumber,
      lawCategoryId: this.lawId,
      lawUrl: this.lawUrl,
      language: this.language,
      versionDate: this.versionDate,
      lawArticleVersionDetails: this.lawArticleVersionDetails
    };
    this.validate();
    if (this.isValid) {
      this.versionService.postAdd(data).subscribe(() => {
        this.toast.success('Added successfully!');
        this.modalRef.hide();
        this.submited.emit();
        this.clearData();
      }, error => {
        this.toast.error('Error! Something went wrong, try again later.');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
    this.lawArticleVersionDetails = [];
  }

  update() {
    this.isValid = true;
    this.concatData(this.inputsArray, this.sectionDescriptionList, this.sectionUrlList);
    const dataToUpdate = {
      lawName: this.lawName,
      lawNumber: this.lawNumber,
      lawCategoryId: this.lawId,
      Id: this.versionId,
      lawUrl: this.lawUrl,
      language: this.language,
      versionDate: this.versionDate,
      lawArticleVersionDetails: this.lawArticleVersionDetails
    };
    this.validate();
    if (this.isValid) {
      this.versionService.update(dataToUpdate).subscribe(() => {
        this.toast.success('Updated successfully!');
        this.modalRef.hide();
        this.submited.emit();
        this.clearData();
      }, error => {
        this.toast.error('Error! Something went wrong, try again later.');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
    this.lawArticleVersionDetails = [];
  }

  onVersionDetailsDelete(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'LawArticleVersionDetails'
      }
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide

      .subscribe(() => {
        if (this.modalRef.content.isdeleted) {
          for (let i = 0; i < this.inputsArray.length; i++) {
            if (this.inputsArray[i].id == id) {
              this.inputsArray.splice(i, 1);
            }
          }
        }
        this.submited.emit();
      }, () => {
        this.toast.error('Error! Something went wrong.');
      });
  }

  clearData() {
    this.lawName = '';
    this.lawNumber = '';
    this.lawUrl = '';
    this.versionId = null;
    this.versionDate = null;
  }

  // on open modal values
  defaultValues() {
    this.lawName = '';
    this.lawNumber = '';
    this.lawUrl = '';
    this.versionDate = null;
    this.sectionDescription = '';
    this.sectionUrl = '';
    this.sectionDescriptionList[0] = '';
    this.sectionUrlList[0] = '';
    this.getLawGroupAndLaw();
  }

  fillData(res: any) {
    this.lawName = res.lawName;
    this.lawNumber = res.lawNumber;
    this.lawUrl = res.lawUrl;
    this.versionDate = new Date(res.versionDate);
    this.getLawGroupAndLaw();
  }

  validateNullOrUndifinedData(attr, id: string) {
    if (attr == null || attr === undefined) {
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

  validate() {
    this.validateStringData(this.lawName, 'lawName');
    this.validateStringData(this.lawNumber, 'lawNumber');
    this.validateStringData(this.lawUrl, 'lawUrl');
    this.validateNullOrUndifinedData(this.lawId, 'lawId');
    this.validateNullOrUndifinedData(this.versionDate, 'versionDate');
  }

  addInput() {
    this.inputsArray.push({});
  }

  removeInput() {
    if (this.inputsArray.length > this.inputsArrayElements) {
      this.inputsArray.splice(this.inputsArray.length - 1, 1);
    }
  }

  concatData(inputsArray, sectionDescriptionList, sectionUrlList) {
    for (let i = 0; i < inputsArray.length; i++) {
      let obj = {
        id: 0,
        description: '',
        url: ''
      };
      if (this.pageType !== 'add') {
        obj.id = inputsArray[i].id;
      }
      obj.description = sectionDescriptionList[i];
      obj.url = sectionUrlList[i];
      this.lawArticleVersionDetails.push(obj);
    }
  }
}
