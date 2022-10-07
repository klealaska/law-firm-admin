import { languageEnum } from './../../enums/languageEnum';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HyperlinksService } from '../../services/hyperlinks/hyperlinks.service';

@Component({
  selector: 'app-add-edit-hyperlinks',
  templateUrl: './add-edit-hyperlinks.component.html',
  styleUrls: ['./add-edit-hyperlinks.component.scss']
})
export class AddEditHyperlinksComponent implements OnInit {

  linkId;
  codeName = "";
  url;
  lawCategoryId;
  lawList = new Array();
  isValid;
  isSubmitted: boolean = false;
  language = languageEnum.Albaninan;

  @Input() pageType: any;
  @Output() public submited: EventEmitter<any> = new EventEmitter();
  @Output() public closeModal: EventEmitter<any> = new EventEmitter();
  @ViewChild('template', { static: false }) template: TemplateRef<any>;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-lg'
  };

  constructor(private modalService: BsModalService,
    private toast: ToastrService,
    private hyperLinkService: HyperlinksService
  ) { }

  ngOnInit() {
  }

  openModal() {
    this.isSubmitted = false;
    if (this.pageType === 'edit') {
      this.modalService.onShow.subscribe(() => {
        this.getData(this.linkId);
      });
    } else {
      this.modalService.onShow.subscribe(() => {
        this.defaultValues();
      });
    }
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  onHideModal() {
    this.closeModal.emit('cancel');
    this.modalRef.hide();
    this.cleardata();
  }

  getData(linkId) {
    this.hyperLinkService.getById(linkId).subscribe((res: any) => {
      this.codeName = res.codeName;
      this.url = res.url;
    });
  }

  defaultValues() {
    this.codeName = '';
    this.url = '';
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
      codeName: this.codeName,
      lawCategoryId: this.lawCategoryId,
      url: this.url,
      language: this.language
    };
    this.validate();
    if (this.isValid) {
      this.hyperLinkService.postAdd(data).subscribe(() => {
        this.toast.success('Added successfully!');
        this.modalRef.hide();
        this.submited.emit();
        this.cleardata();
      }, error => {
        this.toast.error('Error! Something went wrong, try again later.');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
  }

  update() {
    this.isValid = true;
    const dataToUpdate = {
      id: this.linkId,
      codeName: this.codeName,
      lawCategoryId: this.lawCategoryId,
      url: this.url
    };
    this.validate();
    if (this.isValid) {
      this.hyperLinkService.update(dataToUpdate).subscribe(() => {
        this.toast.success('Updated successfully!');
        this.modalRef.hide();
        this.cleardata();
        this.submited.emit();
      }, error => {
        this.toast.error('Error! Something went wrong, try again later.');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
  }

  cleardata() {
    this.codeName = " ";
    this.isSubmitted = false;
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
    this.validateStringData(this.codeName, 'codeName');
    this.validateNullOrUndifinedData(this.lawCategoryId, 'lawCategoryId');
  }
}
