import { PaginateableTableWithLanguage } from './../../Interfaces/PaginableTableWithLanguage';
import { languageEnum } from './../../enums/languageEnum';
import { ImportantTaxDateService } from './../../services/important-tax-date/important-tax-date.service';
import { AddEditImportantTaxDateComponent } from './../../add-edit-modals/add-edit-important-tax-date/add-edit-important-tax-date.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal/';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { Pagination } from '../../Interfaces/Pagination';
import { StorageService } from '../../services/storage/storage.service';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';

export enum tabStateEnum {
  alTab = 'alTab',
  enTab = 'enTab',
}

@Component({
  selector: 'app-important-tax-date',
  templateUrl: './important-tax-date.component.html',
  styleUrls: ['./important-tax-date.component.scss']
})
export class ImportantTaxDateComponent implements OnInit, PaginateableTableWithLanguage {

  public data: any;
  public dataInEnglish: any;
  public modalRef: BsModalRef;
  public filterQuery;
  // language props
  language: string = languageEnum.Albaninan;
  public albanian = languageEnum.Albaninan;
  public english = languageEnum.English;
  // tab state props
  activeTab: string = tabStateEnum.alTab;
  alTab: string = tabStateEnum.alTab;
  enTab: string = tabStateEnum.enTab;

  @ViewChild('editElement', { static: false }) editElement: AddEditImportantTaxDateComponent;

  columns = [
    { title: 'Title', name: 'eventTitle', property: 'width20' },
    { title: 'Description', name: 'eventDescription', property: 'isContent' },
    { title: 'Event Date', name: 'eventDate', property: 'width8' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private taxNewsService: ImportantTaxDateService,
    private spinner: NgxSpinnerService,
    private storageService: StorageService
  ) { }

  albanianPaginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };
  englishPaginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };

  onAlbanianTablePaginationValuesChange(values: PaginationModel) {
    this.albanianPaginationModel = values;
    this.getData();
  }

  onEnglishTablePaginationValuesChange(values: PaginationModel) {
    this.englishPaginationModel = values;
    this.getData();
  }

  ngOnInit() {
    this.checkStateOnInit(JSON.parse(this.storageService.getStorage(storageLabelsEnum.TaxDateTabState)));
  }

  checkStateOnInit(state) {
    if (state != null) {
      this.language = state.language != null ? state.language : this.albanian;
      this.activeTab = state.activeTab != null ? state.activeTab : this.alTab;
    }
    this.getData();
  }

  setTabState(language) {
    this.storageService.removeStorage(storageLabelsEnum.TaxDateTabState);
    this.activeTab = language == languageEnum.Albaninan ? this.alTab : this.enTab;
    const state = {
      language: language,
      activeTab: this.activeTab
    }
    this.storageService.setStorage(storageLabelsEnum.TaxDateTabState, JSON.stringify(state));
  }

  getData() {
    this.spinner.show();
    let paginate = new Pagination(this.albanianPaginationModel);
    this.taxNewsService.getAll(this.language, paginate).subscribe((res: any) => {
      this.albanianPaginationModel.TotalItems = res.totalRecords;
      this.albanianPaginationModel.PageNumber = res.pageNumber;
      this.albanianPaginationModel.PageSize = res.pageSize;
      this.data = res.body;
      this.data.forEach(date => {
        date.eventDate = moment(date.eventDate).format('MMM Do YYYY');
      });
      this.spinner.hide();
    }, () => {
      this.toast.error('Something went wrong.Try again later.');
      this.spinner.hide();
    });
  }

  openModalToAddInAL() {
    this.editElement.pageType = 'add';
    this.editElement.language = languageEnum.Albaninan;
    this.editElement.openModal();
  }

  openModalToAddInEN() {
    this.editElement.pageType = 'add';
    this.editElement.language = languageEnum.English;
    this.editElement.openModal();
  }

  onActionClick(event: any, language?: string) {
    switch (event.action) {
      case 'edit':
        this.editItem(event.id, language);
        break;
      case 'delete':
        this.deleteItem(event.id);
        break;
      case 'translate':
        this.translate(event.id);
        break;
      default:
        break;
    }
  }

  editItem(id, language) {
    this.editElement.pageType = 'edit';
    this.editElement.language = language;
    this.editElement.itemId = id;
    this.editElement.openModal();
  }

  translate(id) {
    this.editElement.pageType = 'translate';
    this.editElement.itemId = id;
    this.editElement.language = this.english;
    this.editElement.openModal();
  }

  deleteItem(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'Important_Tax_Date'
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

  onTabChange(language) {
    this.setTabState(language);
    this.language = language;
    this.getData();
  }

  refreshGrid() {
    this.getData();
  }
}
