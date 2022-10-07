import { Component, OnInit, Input, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';
import { RoleService } from '../../services/user-role/role.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-edit-user-modal',
  templateUrl: './add-edit-user-modal.component.html',
  styleUrls: ['./add-edit-user-modal.component.scss']
})

export class AddEditUserModalComponent implements OnInit {

  public email = '';
  public firstName;
  public lastName;
  public password = '';
  public confPassword = '';
  public itemId;
  public roles = Array<any>();
  public rolesIds: Array<any>;
  isValid = true;
  isSubmitted: boolean = false;

  pageType: any;
  @Output() public submited: EventEmitter<any> = new EventEmitter();
  @ViewChild('template', { static: false }) template: TemplateRef<any>;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-lg'
  };

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private toast: ToastrService,
    private roleService: RoleService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getUserRoles();
  }

  openModal() {
    this.defaultValues();
    this.modalRef = this.modalService.show(this.template, this.config);
    if (this.pageType === 'add') {
      this.getUserRoles();
    }
    if (this.pageType === 'edit') {
      this.getData();
    }
  }

  getData() {
    this.userService.getById(this.itemId).subscribe((res: any) => {
      this.firstName = res.firstName;
      this.lastName = res.lastName;
      this.email = res.email;
      this.rolesIds = res.userRoleIds;
    });
  }

  getUserRoles() {
    this.roleService.getAll().subscribe((res: any) => {
      res.forEach(role => {
        if (role.isReadOnly === true) {
          this.roles.push(role);
        }
      });
    });
  }

  add() {
    this.isValid = true;
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      userRoleIds: this.rolesIds
    };
    this.validateData(this.email, 'email');
    this.validateData(this.password, 'password');
    this.validateData(this.confPassword, 'confirm password');
    if (this.rolesIds == null) {
      this.isValid = false;
      this.toast.warning(`Please choose a role for the user!`);
    }
    this.validateNgSelect(this.rolesIds);
    if (this.email.length > 0) {
      this.validateEmail(this.email);
    }
    if (this.password.length > 0) {
      this.validatePassword(this.password);
    }
    if (this.confPassword.length > 0 && this.confPassword !== this.password) {
      this.isValid = false;
      this.toast.warning('Passwords don\'t match!');
    }
    if (this.isValid) {
      this.spinner.show();
      this.userService.postRegister(data).subscribe(() => {
        this.toast.success('User added successfully! User must confirm account.');
        this.modalRef.hide();
        this.submited.emit();
        this.spinner.hide();
      }, error => {
        if (error.status === 403) {
          this.toast.info('User already exists!Try another email!');
          this.spinner.hide();
        } else {
          this.toast.error('Error! Something went wrong, try again later.');
          this.modalRef.hide();
          this.spinner.hide();
        }
      });
    } else {
      this.isSubmitted = false;
    }
  }

  update() {
    this.isValid = true;
    const dataToUpdate = {
      id: this.itemId,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      userRoleIds: this.rolesIds,
      password: this.password
    };
    this.validateData(this.email, 'email');
    this.validateNgSelect(this.rolesIds);
    // this.validateData(this.password, 'password');
    // this.validateData(this.confPassword, 'confirm password');
    if (this.email.length > 0) {
      this.validateEmail(this.email);
    }
    if (this.password.length > 0) {
      this.validatePassword(this.password);
    }
    if (this.confPassword.length > 0 && this.confPassword !== this.password) {
      this.isValid = false;
      this.toast.warning('Passwords don\'t match!');
    }
    if (this.isValid) {
      this.spinner.show();
      this.userService.update(dataToUpdate).subscribe(() => {
        this.toast.success('Updated successfully!');
        this.modalRef.hide();
        this.submited.emit();
        this.isSubmitted = false;
        this.spinner.hide();
      }, error => {
        this.toast.warning('Error! Cannot edit, try again later.');
        this.modalRef.hide();
        this.spinner.hide();
      });
    } else {
      this.isSubmitted = false;
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

  validatePassword(password) {
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    const valid = regex.test(password);
    if (!valid) {
      this.isValid = false;
      this.toast.warning('Password must have 8 alphanumeric characters, such as: "A,a,@,1"');
    }
  }

  validateEmail(email) {
    const regex = new RegExp('[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+');
    const valid = regex.test(email);
    if (!valid) {
      this.isValid = false;
      this.toast.warning('Email not valid!');
    }
  }

  validateNgSelect(attr) {
    if (attr.length === 0) {
      this.isValid = false;
      this.toast.warning(`Please choose a role for the user!`);
    }
  }

  validateData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  defaultValues() {
    this.isSubmitted = false;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.confPassword = '';
    this.rolesIds = new Array();
  }
}
