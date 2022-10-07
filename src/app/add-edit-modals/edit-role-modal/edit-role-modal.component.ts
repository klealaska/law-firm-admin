import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../services/user-role/role.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-role-modal',
  templateUrl: './edit-role-modal.component.html',
  styleUrls: ['./edit-role-modal.component.scss']
})
export class EditRoleModalComponent implements OnInit {

  public name = '';
  public itemId;

  @Input() pageType: any;
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
    private roleService: RoleService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    if (this.pageType === 'edit') {
      this.modalService.onShow.subscribe(() => {
        this.getData();
      });
    }
  }

  getData() {
    this.roleService.getById(this.itemId).subscribe((res: any) => {
      this.name = res.name;
    });
  }

  openModal() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  onSubmit() {
    const dataToUpdate = {
      id: this.itemId,
      name: this.name
    };
    if (this.name === '') {
      this.toast.warning('Please fill out this field!');
    } else {
      this.spinner.show();
      this.roleService.update(dataToUpdate).subscribe(() => {
        this.toast.success('Updated successfully!');
        this.modalRef.hide();
        this.submited.emit();
        this.spinner.hide();
      }, error => {
        this.toast.warning('Error! Cannot edit, try again later.');
        this.modalRef.hide();
        this.spinner.hide();
      });
    }
  }
}
