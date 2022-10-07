import { PaginateableTable } from './../../Interfaces/PaginateableTable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal/';
import { AddEditUserCategoryComponent } from '../../add-edit-modals/add-edit-user-category/add-edit-user-category.component';
import { ToastrService } from 'ngx-toastr';
import { UserCategoryService } from '../../services/user-category/user-category.service';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { Pagination } from '../../Interfaces/Pagination';

@Component({
  selector: 'app-user-category',
  templateUrl: './user-category.component.html',
  styleUrls: ['./user-category.component.scss']
})
export class UserCategoryComponent implements OnInit, PaginateableTable {

  public data: any;
  public modalRef: BsModalRef;
  public itemId;
  public filterQuery;

  @ViewChild('editElement', { static: true }) editElement: AddEditUserCategoryComponent;
  columns = [
    { title: 'Name', name: 'name' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  constructor(
    private userCategoryService: UserCategoryService,
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
    let paginate = new Pagination(this.paginationModel);
    this.userCategoryService.getAll(paginate).subscribe((res: any) => {
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
        item: 'Category'
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
