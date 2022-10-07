import { StorageService } from './../../services/storage/storage.service';
import { languageEnum } from './../../enums/languageEnum';
import { PaginationModel } from './../../Interfaces/PaginationModel';
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaxNewsService } from '../../services/tax-news/tax-news.service';
import { AddEditTaxNewsModalComponent } from '../../add-edit-modals/add-edit-tax-news-modal/add-edit-tax-news-modal.component';
import * as moment from 'moment';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { Pagination } from '../../Interfaces/Pagination';
import { PaginateableTable } from '../../Interfaces/PaginateableTable';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';

export enum tabStateEnum {
  alTab = 'alTab',
  enTab = 'enTab',
}

@Component({
  selector: 'app-tax-news',
  templateUrl: './tax-news.component.html',
  styleUrls: ['./tax-news.component.scss']
})
export class TaxNewsComponent implements OnInit, PaginateableTable {
  // data props
  public taxNewList = new Array<any>();
  public filterQuery;
  public modalRef: BsModalRef;
  public paginationModel: PaginationModel = { TotalItems: 0, PageNumber: 0, PageSize: 1 };
  // language props
  language = languageEnum.Albaninan;
  albanian = languageEnum.Albaninan;
  english = languageEnum.English;
  // tab state props
  activeTab: string = tabStateEnum.alTab;
  alTab: string = tabStateEnum.alTab;
  enTab: string = tabStateEnum.enTab;

  @ViewChild('editElement', { static: true }) editElement: AddEditTaxNewsModalComponent;

  columnsTaxNew = [
    { title: 'Title', name: 'title' },
    { title: 'Attachments', name: 'taxNewsAttachments', property: 'taxPdf' },
    { title: 'Published Date', name: 'publishedDate', property: 'width8' },
    { title: 'Image', name: 'imageUrl', property: 'isImage' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  constructor(
    private taxNewsService: TaxNewsService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.checkStateOnInit(JSON.parse(this.storageService.getStorage(storageLabelsEnum.TaxNewsTabState)));
  }

  checkStateOnInit(state) {
    if (state != null) {
      this.language = state.language != null ? state.language : this.albanian;
      this.activeTab = state.activeTab != null ? state.activeTab : this.alTab;
    }
    this.getData();
  }

  setTabState(language) {
    this.storageService.removeStorage(storageLabelsEnum.TaxNewsTabState);
    this.activeTab = language == languageEnum.Albaninan ? this.alTab : this.enTab;
    const state = {
      language: language,
      activeTab: this.activeTab
    }
    this.storageService.setStorage(storageLabelsEnum.TaxNewsTabState, JSON.stringify(state));
  }

  getData() {
    this.spinner.show();
    let paginate = new Pagination(this.paginationModel);
    this.taxNewsService.getAll(paginate, this.language).subscribe((res: any) => {
      this.paginationModel.TotalItems = res.totalRecords;
      this.paginationModel.PageNumber = res.pageNumber;
      this.paginationModel.PageSize = res.pageSize;
      this.taxNewList = res.body;
      this.taxNewList.forEach(tax => {
        tax.publishedDate = moment(tax.publishedDate).format('MMM Do YYYY');
      });
      this.spinner.hide();
    }, error => {
      this.toast.error('Something Happend! Cannot get data, try again later.');
      this.spinner.hide();
    });
  }

  openModal() {
    this.editElement.pageType = 'add';
    this.editElement.language = this.language;
    this.editElement.openModal();
  }

  editItem(id) {
    this.editElement.pageType = 'edit';
    this.editElement.language = this.language;
    this.editElement.itemId = id;
    this.editElement.openModal();
  }

  deleteItem(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'Tax News',
        language: this.language
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

  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
    this.getData();
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

  onTabChange(language) {
    this.setTabState(language);
    this.language = language;
    this.getData();
  }

  refreshGrid() {
    this.getData();
  }
}
