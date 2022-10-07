import { Pagination } from './../../Interfaces/Pagination';
import { PaginateableTable } from './../../Interfaces/PaginateableTable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { UserGroupsService } from '../../services/user-groups/user-groups.service';
import { AddEditUserGroupsComponent } from '../../add-edit-modals/add-edit-user-groups/add-edit-user-groups.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginationModel } from '../../Interfaces/PaginationModel';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent implements OnInit, PaginateableTable {

  public data: any;
  public modalRef: BsModalRef;
  public itemId;
  public filterQuery;

  @ViewChild('editElement', { static: true }) editElement: AddEditUserGroupsComponent;

  columns = [
    { title: 'Name', name: 'name' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  constructor(
    private userGroupsService: UserGroupsService,
    private toast: ToastrService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
  ) { }

  paginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };
  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
    this.getData();
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spinner.show();
    let pagination = new Pagination(this.paginationModel);
    this.userGroupsService.getAll(pagination).subscribe((res: any) => {
      this.paginationModel.TotalItems = res.totalRecords;
      this.paginationModel.PageNumber = res.pageNumber;
      this.paginationModel.PageSize = res.pageSize;
      this.data = res.body;
      this.spinner.hide();
    }, error => {
      this.toast.error('Something Happend! Cannot get data, try again later.');
      this.spinner.hide();
    });
  }

  onActionClick(event: any) {
    switch (event.action) {
      case 'delete':
        this.deleteItem(event.id);
        break;
      case 'edit':
        this.editItem(event.id);
        break;
      default:
        break;
    }
  }

  deleteItem(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'Group'
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isdeleted) {
        this.getData();
      }
    }, error => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  openModal() {
    this.editElement.pageType = 'add';
    this.editElement.openModal();
  }

  editItem(id) {
    this.editElement.pageType = 'edit';
    this.editElement.itemId = id;
    this.editElement.openModal();
  }

  refreshGrid() {
    this.getData();
  }
}
