import { languageEnum } from './../../enums/languageEnum';
import { Component, OnInit, TemplateRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/ngx-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TagService } from '../../services/tag/tag.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-edit-tag-modal',
  templateUrl: './add-edit-tag-modal.component.html',
  styleUrls: ['./add-edit-tag-modal.component.scss']
})
export class AddEditTagModalComponent implements OnInit {

  public name = '#';
  public language: string = languageEnum.Albaninan;
  public albanian: string = languageEnum.Albaninan;
  public english: string = languageEnum.English;
  public other: string = languageEnum.Other;
  public itemId;
  pageType: any;

  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @Output() public submited: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered'
  };
  isValid: boolean;
  isSubmitted: boolean = false;

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private tagService: TagService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
  }

  openModal() {
    console.log(this.language);

    this.isSubmitted = false;
    this.modalRef = this.modalService.show(this.template, this.config);
    if (this.pageType === 'edit') {
      this.getData();
    }
    if (this.pageType === 'add') {
      this.name = '#';
    }
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
    const data = {
      name: this.checkTag(this.name),
      language: this.language
    };
    if (this.name.length > 1) {
      this.spinner.show();
      this.tagService.postAdd(data).subscribe(() => {
        this.toast.success('Tag added successfully!');
        this.modalRef.hide();
        this.submited.emit();
        this.name = '';
        this.spinner.hide();
      }, error => {
        this.toast.error('Error! Something went wrong, try again later.');
        this.modalRef.hide();
        this.spinner.hide();
      });
    } else {
      this.isSubmitted = false;
      this.toast.warning('Please fill out this field!');
    }
  }

  update() {
    const dataToUpdate = {
      id: this.itemId,
      name: this.name,
      language: this.language
    };
    if (this.name.length > 0) {
      this.spinner.show();
      this.tagService.update(dataToUpdate).subscribe(() => {
        this.toast.success('Updated successfully!');
        this.modalRef.hide();
        this.submited.emit();
        this.spinner.hide();
      }, error => {
        this.toast.error('Error! Cannot edit, try again later.');
        this.modalRef.hide();
        this.spinner.hide();
      });
    } else {
      this.isSubmitted = false;
      this.toast.warning('Please fill out this field!');
    }
  }

  getData() {
    this.tagService.getById(this.itemId).subscribe((res: any) => {
      this.name = res.name;
      // this.language = res.language;
    });
  }

  checkTag(tag: string) {
    const regex = new RegExp(/^[\#]/);
    const valid = regex.test(tag);
    if (!valid) {
      return `#${tag}`;
    } else {
      return tag;
    }
  }
}
