import { FilterModel } from './../../Interfaces/FilterModel';
import { PaginateableTable } from './../../Interfaces/PaginateableTable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/';
import { AddEditUserModalComponent } from '../../add-edit-modals/add-edit-user-modal/add-edit-user-modal.component';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { Pagination } from '../../Interfaces/Pagination';

enum tabStateEnum {
  sysUsers = 'sysUsers',
  clientUsers = 'clientUsers'
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, PaginateableTable {
  public roles = new Array<any>();
  public sysUserData = new Array<any>();
  public userData = new Array<any>();
  public filterQuery: string = '';
  public filterColumn = 'email';
  public modalRef: BsModalRef;

  sysUsersTab = tabStateEnum.sysUsers;
  clientUsersTab = tabStateEnum.clientUsers;

  @ViewChild('editElement', { static: true }) editElement: AddEditUserModalComponent;

  columnsSysUsers = [
    { title: 'Email', name: 'user.email' },
    { title: 'Firstname', name: 'user.firstName' },
    { title: 'Lastname', name: 'user.lastName' },
    { title: 'Role', property: 'roles' },
    { title: 'Last Login', property: 'lastLogin' },
    { title: 'Status', name: 'user.isActive', property: 'isSwitchBtn', class: 'text-center' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  columnsRegisteredUsers = [
    { title: 'Email', name: 'user.email' },
    { title: 'Firstname', name: 'user.firstName' },
    { title: 'Lastname', name: 'user.lastName' },
    { title: 'Company', name: 'user.company' },
    { title: 'Group', name: 'user.userGroupName' },
    { title: 'Category', name: 'user.userCategoryName' },
    { title: 'Role', property: 'roles' },
    { title: 'Last Login', property: 'lastLogin' },
    { title: 'Status', property: 'isSwitchBtn', class: 'text-center' },
  ];

  dataList = [
    { code: 'email', name: 'Email' },
    { code: 'firstname', name: "Firstname" },
    { code: 'lastname', name: 'Lastname' },
    { code: 'role', name: 'Role' }
  ];

  constructor(
    private userService: UserService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {

  }

  paginationModel: PaginationModel = { TotalItems: 1, PageNumber: 1, PageSize: 1 };
  systemTablePaginationModel: PaginationModel = { TotalItems: 1, PageNumber: 1, PageSize: 1 };

  onSystemTablePaginationValuesChange(values: PaginationModel) {
    this.systemTablePaginationModel = values;
    this.getSystemUsersData();
  }

  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
    this.getRegisteredUsersData();
  }

  openModal() {
    this.editElement.pageType = 'add';
    this.editElement.openModal();
  }

  ngOnInit() {
    this.getSystemUsersData();
  }

  getSystemUsersData() {
    this.spinner.show();
    this.sysUserData = new Array();
    let paginate = new Pagination(this.systemTablePaginationModel);
    this.userService.getAllSystemUser(paginate).subscribe((res: any) => {
      this.systemTablePaginationModel.TotalItems = res.totalRecords;
      this.systemTablePaginationModel.PageNumber = res.pageNumber;
      this.systemTablePaginationModel.PageSize = res.pageSize;
      res.body
        .forEach(user => {
          this.sysUserData.push({ user, roleNames: user.roles });
        });
      this.spinner.hide();
    }, error => {
      this.toast.error('Error! Something went wrong.');
      this.spinner.hide();
    });
  }

  getRegisteredUsersData() {
    this.spinner.show();
    this.userData = new Array();
    let paginate = new Pagination(this.paginationModel);
    this.userService.getAllRegisteredUser(paginate).subscribe((res: any) => {
      this.paginationModel.TotalItems = res.totalRecords;
      this.paginationModel.PageNumber = res.pageNumber;
      this.paginationModel.PageSize = res.pageSize;
      res.body.forEach(user => {
        this.userData.push({ user, roleNames: user.roles });
      });
      this.spinner.hide();
    }, error => {
      this.toast.error('Error! Something went wrong.');
      this.spinner.hide();
    });
  }

  userStatusEvent(event) {
    this.userService.delete(event.userId).subscribe(() => {
      if (event.value) {
        this.toast.info('User activated');
      } else {
        this.toast.info('User deactivated');
      }
    }, error => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  editItem(id) {
    this.editElement.pageType = 'edit';
    this.editElement.itemId = id;
    this.editElement.openModal();
  }

  onActionClick(event: any) {
    switch (event.action) {
      case 'edit':
        this.editItem(event.id);
        break;
      default:
        break;
    }
  }

  async search() {
    let isValid = true;
    const filterData: FilterModel = {
      Column: this.filterColumn,
      Property: this.filterQuery
    };
    if (this.filterColumn == null || this.filterColumn == undefined) {
      this.toast.warning('Choose a column to search');
      isValid = false;
    }
    if (filterData.Property.length == 0) {
      this.toast.warning('Fill out search field');
      isValid = false;
    }
    if (isValid) {
      this.spinner.show();
      this.sysUserData = new Array();
      let pagination = new Pagination(this.systemTablePaginationModel)
      let res: any = await this.userService.searchSystemUser(filterData, pagination).toPromise();
      res.body.forEach(user => {
        this.sysUserData.push({ user, roleNames: user.roles });
      });
      this.spinner.hide();
    }
  }

  refreshGrid() {
    this.getSystemUsersData();
    // this.getRegisteredUsersData();
  }

  getFilterColumn(event) {
    this.filterColumn = event;
  }

  onTabSelect(tab) {
    switch (tab) {
      case this.sysUsersTab:
        this.getSystemUsersData();
        break;
      case this.clientUsersTab:
        this.getRegisteredUsersData();
        break;
    }
  }

  async searchOnEnter(event) {
    if (event.code == 'Enter') {
      await this.search();
    }
  }
}
