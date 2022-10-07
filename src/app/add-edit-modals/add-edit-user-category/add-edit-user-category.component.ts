import { Component, OnInit, TemplateRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/ngx-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { UserCategoryService } from '../../services/user-category/user-category.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-edit-user-category',
  templateUrl: './add-edit-user-category.component.html',
  styleUrls: ['./add-edit-user-category.component.scss']
})
export class AddEditUserCategoryComponent implements OnInit {


  public name = '';
  public itemId;
  isSubmitted: boolean = false;
  pageType: any;
  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @Output() public submited: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered'
  };

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private userCategoryService: UserCategoryService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
  }

  openModal() {
    this.name = '';
    this.isSubmitted = false;
    this.modalRef = this.modalService.show(this.template, this.config);
    if (this.pageType === 'edit') {
      this.getData();
    }
  }

  getData() {
    this.userCategoryService.getById(this.itemId).subscribe((res: any) => {
      this.name = res.name;
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
    const data = {
      name: this.name
    };
    if (this.name.length > 0) {
      this.spinner.show();
      this.userCategoryService.postAdd(data).subscribe(() => {
        this.toast.success('Category added successfully!');
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
      this.toast.warning('Please fill out this field!');
    }
  }

  update() {
    const dataToUpdate = {
      id: this.itemId,
      name: this.name
    };
    if (this.name.length > 0) {
      this.spinner.show();
      this.userCategoryService.update(dataToUpdate).subscribe(() => {
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
}
