import { Pagination } from './../../Interfaces/Pagination';
import { PaginateableTable } from './../../Interfaces/PaginateableTable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LawCategoryService } from '../../services/law-category/law-category.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { LawArticleVersionService } from '../../services/law-article-version/law-article-version.service';
import { AddEditLawVersionComponent } from '../../add-edit-modals/add-edit-law-version/add-edit-law-version.component';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import * as moment from 'moment';
import { languageEnum } from '../../enums/languageEnum';
import { take } from 'rxjs/operators';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-law-article-version',
  templateUrl: './law-article-version.component.html',
  styleUrls: ['./law-article-version.component.scss']
})
export class LawArticleVersionComponent implements OnInit, PaginateableTable {

  // versions
  public versionList = new Array<any>();
  public filterQuery;
  public modalRef: BsModalRef;

  // Law Categories
  public parentList = new Array();
  public parentId;
  public lawList = new Array();
  public lawId;

  public language = languageEnum.Albaninan;
  english = languageEnum.English;
  albanian = languageEnum.Albaninan;
  currentOpenedTab;

  @ViewChild('editElement', { static: false }) editElement: AddEditLawVersionComponent;

  public columns = [
    { title: 'Description', name: 'description' },
    { title: 'Url', name: 'url' }
  ];
  pageNumber: any = 1;
  paginationEnd: any;
  paginationStart: any;

  constructor(
    private lawArticleVersionService: LawArticleVersionService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private lawCategoryService: LawCategoryService,
    private modalService: BsModalService,
    private storageService: StorageService
  ) { }

  paginationModel: PaginationModel = { TotalItems: 1, PageNumber: 1, PageSize: 1 };
  accordionPaginationModel: PaginationModel = { TotalItems: 1, PageNumber: 1, PageSize: 1 };

  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
  }

  ngOnInit() {
    this.getMainCategories();
    let stateData = JSON.parse(this.storageService.getStorage(storageLabelsEnum.LawVersionsDataState));
    if (stateData != null) {
      this.parentId = stateData.parentId;
      this.parentList = stateData.parentList;
      this.lawId = stateData.lawId;
      this.lawList = stateData.lawList;
      this.language = stateData.language;
      if (stateData.lawList.length > 0) {
        this.getVersions(this.lawId);
      }
    } else {
      this.getVersions();
    }
  }

  setDataState() {
    this.storageService.removeStorage(storageLabelsEnum.LawVersionsDataState);
    let state = {
      parentId: this.parentId,
      parentList: this.parentList,
      lawId: this.lawId,
      lawList: this.lawList,
      language: this.language
    };
    this.storageService.setStorage(storageLabelsEnum.LawVersionsDataState, JSON.stringify(state));
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

  getVersions(event?) {
    this.lawId = event;
    let pagination = new Pagination(this.accordionPaginationModel);
    this.lawArticleVersionService.getLawArticleVersionsAndDetails(this.language, event, pagination).subscribe((res: any) => {
      this.setPagination = res;
      this.versionList = res.body;
      this.versionList.forEach((element) => {
        element.versionDate = moment(element.versionDate).format('MMM Do YYYY');
      });
      this.spinner.hide();
    }, error => {
      this.toast.error('Something Happend! Cannot get data, try again later.');
      this.spinner.hide();
    });
    this.setDataState();
  }

  deleteVersion(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'LawArticleVersion',
        language: this.language
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

  editItem(id) {
    this.editElement.pageType = 'edit';
    this.editElement.versionId = id;
    this.editElement.lawId = this.lawId;
    this.editElement.parentId = this.parentId;
    this.editElement.language = this.language;
    this.editElement.openModal();
  }

  addItem() {
    this.editElement.pageType = 'add';
    this.editElement.parentId = this.parentId;
    this.editElement.lawId = this.lawId;
    this.editElement.language = this.language;
    this.editElement.openModal();
  }

  onActionClick(event: any, id) {
    switch (event) {
      case 'delete':
        this.deleteVersion(id);
        break;
      case 'edit':
        this.editItem(id);
        break;
      default:
        break;
    }
  }

  onLanguageSelect(language) {
    this.resetValues();
    this.language = language;
    this.getMainCategories();
  }

  resetValues() {
    this.versionList = new Array();
    this.parentList = new Array();
    this.parentId = null;
    this.lawList = new Array();
    this.lawId = null;
  }

  refreshGrid() {
    this.getVersions(this.lawId);
  }

  tabState(state) {
    this.currentOpenedTab = state;
  }

  //#region Pagination

  set setPagination(res) {
    this.paginationModel.TotalItems = res.totalRecords;
    this.paginationModel.PageNumber = res.pageNumber;
    this.paginationModel.PageSize = res.pageSize;
  }

  paginate(pageNumber) {
    if (pageNumber <= 3) {
      this.paginationStart = 0;
      this.paginationEnd = 5;
    } else
      if (pageNumber < this.paginationModel.PageNumber) {
        this.paginationStart--;
        this.paginationEnd--;
      }
      else {
        this.paginationStart++;
        this.paginationEnd++;
      }
    let condition = this.paginationModel.TotalItems % this.paginationModel.PageSize == 0;
    if (condition) {
      var comparer = Math.floor(this.paginationModel.TotalItems / this.paginationModel.PageSize);
    } else { comparer = Math.floor(this.paginationModel.TotalItems / this.paginationModel.PageSize) + 1; }
    if (pageNumber <= comparer && pageNumber > 0) {
      this.pageNumber = pageNumber;
      this.paginationModel.PageNumber = pageNumber;
      this.setActiveClass(pageNumber);
    }
  }

  onPageSizeChange(event) {
    this.paginationStart = 0;
    this.paginationEnd = 5;
    this.accordionPaginationModel.PageNumber = 1;
    this.pageNumber = 1;
    this.accordionPaginationModel.PageSize = event.target.value;
    this.getVersions(this.lawId);
  }

  setActiveClass(id) {
    let li = document.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
      if (li[i].classList.contains('active')) {
        li[i].classList.remove('active');
      }
    }
    document.getElementById(id).classList.add('active');
  }

  next() {
    if (this.pageNumber >= this.paginationEnd) {
      this.paginationStart += 10;
      this.paginationEnd += 10;
    }
    this.paginate(this.pageNumber + 1);
  }

  previous() {
    if (this.pageNumber <= this.paginationStart) {
      this.paginationStart -= 10;
      this.paginationEnd -= 10;
    }
    this.paginate(this.pageNumber - 1);
  }

  NumberOfPages(start: number = 0, end: number = 0) {
    let array;
    if (this.paginationModel.TotalItems % this.paginationModel.PageSize == 0) {
      array = Array(Math.floor(this.paginationModel.TotalItems / this.paginationModel.PageSize));
    }
    else if (this.paginationModel.TotalItems > this.paginationModel.PageSize) {
      array = Array(Math.floor(this.paginationModel.TotalItems / this.paginationModel.PageSize) + 1);
    }
    else {
      array = Array(1);
    }

    for (let i = 0; i < array.length; ++i) {
      array[i] = i + 1;
    }

    if (end > 0) {
      array = array.slice(start, end);
    }

    return array;
  }

  //#endregion
}

