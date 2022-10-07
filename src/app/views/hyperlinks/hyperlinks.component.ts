import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Pagination } from './../../Interfaces/Pagination';
import { PaginateableTableWithLanguage } from './../../Interfaces/PaginableTableWithLanguage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LawCategoryService } from '../../services/law-category/law-category.service';
import { HyperlinksService } from '../../services/hyperlinks/hyperlinks.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddEditHyperlinksComponent } from '../../add-edit-modals/add-edit-hyperlinks/add-edit-hyperlinks.component';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { languageEnum } from '../../enums/languageEnum';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-hyperlinks',
  templateUrl: './hyperlinks.component.html',
  styleUrls: ['./hyperlinks.component.scss']
})
export class HyperlinksComponent implements OnInit, PaginateableTableWithLanguage {

  public linksList = new Array<any>();
  public filterQuery;
  public modalRef: BsModalRef;

  // Law Categories
  public parentList = new Array();
  public parentId;
  public lawList = new Array();
  public lawId;
  // end of law categories

  public language = languageEnum.Albaninan;
  english = languageEnum.English;
  albanian = languageEnum.Albaninan;

  @ViewChild('editElement', { static: true }) editElement: AddEditHyperlinksComponent;
  columnsLink = [
    { title: 'Code name', name: 'codeName' },
    { title: 'Code URL', name: 'url' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  constructor(private lawCategoryService: LawCategoryService,
    private hyperlinkService: HyperlinksService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private storageService: StorageService
  ) { }

  englishPaginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };
  albanianPaginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };

  onAlbanianTablePaginationValuesChange(values: PaginationModel) {
    this.albanianPaginationModel = values;
  }

  onEnglishTablePaginationValuesChange(values: PaginationModel) {
    this.englishPaginationModel = values;
  }

  ngOnInit() {
    this.getMainCategories();
    let stateData = JSON.parse(this.storageService.getStorage(storageLabelsEnum.HyperlinkDataState));
    if (stateData != null) {
      this.parentId = stateData.parentId;
      this.parentList = stateData.parentList;
      this.lawId = stateData.lawId;
      this.lawList = stateData.lawList;
      this.language = stateData.language;
      if (stateData.lawList.length > 0) {
        this.getHyperLinks(this.lawId);
      }
    } else {
      this.getHyperLinks();
    }
  }

  getMainCategories() {
    this.lawCategoryService.getAllMainCategories(this.language).subscribe((res: any) => {
      this.parentList = res.body;
    });
  }

  getLaws(event) {
    this.lawId = null;
    this.lawList = new Array();
    this.lawCategoryService.getLawsByMainCategoryId(event, this.language).subscribe((res: any) => {
      this.lawList = res.body;
    });
  }

  setDataState() {
    this.storageService.removeStorage(storageLabelsEnum.HyperlinkDataState);
    let state = {
      parentId: this.parentId,
      parentList: this.parentList,
      lawId: this.lawId,
      lawList: this.lawList,
      language: this.language
    };
    this.storageService.setStorage(storageLabelsEnum.HyperlinkDataState, JSON.stringify(state));
  }

  getHyperLinks(event?) {
    this.spinner.show();
    let pagination = new Pagination(this.albanianPaginationModel);
    this.hyperlinkService.getLinksByLawId(event, this.language, pagination).subscribe((res: any) => {
      this.albanianPaginationModel.TotalItems = res.totalRecords;
      this.albanianPaginationModel.PageNumber = res.pageNumber;
      this.albanianPaginationModel.PageSize = res.pageSize;
      this.linksList = res.body;
      this.spinner.hide();
    }, error => {
      this.toast.error('Something Happend! Cannot get data, try again later.');
      this.spinner.hide();
    });
    this.setDataState();
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

  editItem(id) {
    this.editElement.pageType = 'edit';
    this.editElement.linkId = id;
    this.editElement.lawList = this.lawList;
    this.editElement.lawCategoryId = this.lawId;
    this.editElement.openModal();
  }

  addItem() {
    this.editElement.pageType = 'add';
    this.editElement.lawList = this.lawList;
    this.editElement.lawCategoryId = this.lawId;
    this.editElement.language = this.language;
    this.editElement.openModal();
  }

  deleteItem(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'Hyperlink'
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isdeleted) {
        this.refreshGrid();
      }
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  onLanguageSelect(language) {
    this.resetValues();
    this.language = language;
    this.getMainCategories();
  }

  refreshGrid() {
    this.getHyperLinks(this.lawId);
  }

  resetValues() {
    this.parentId = null;
    this.lawList = new Array();
    this.lawId = null;
    this.linksList = new Array();
  }
}
