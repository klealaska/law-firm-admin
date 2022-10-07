import { lawCategoryType } from './../../enums/lawCategoryType';
import { StorageService } from './../../services/storage/storage.service';
import { Pagination } from './../../Interfaces/Pagination';
import { PaginateableTableWithLanguage } from './../../Interfaces/PaginableTableWithLanguage';
import { languageEnum } from './../../enums/languageEnum';
import { DeleteModalComponent } from './../../components/delete-modal/delete-modal.component';
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LawCategoryService } from '../../services/law-category/law-category.service';
import { AddEditLawCategoryComponent } from '../../add-edit-modals/add-edit-law-category/add-edit-law-category.component';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';
@Component({
  selector: 'app-law-category',
  templateUrl: './law-category.component.html',
  styleUrls: ['./law-category.component.scss']
})
export class LawCategoryComponent implements OnInit, PaginateableTableWithLanguage {

  public categoryList = new Array<any>();
  public parentList = new Array();
  public chapterList = new Array();
  public lawList = new Array();
  public parentId;
  public parentName;
  public lawId;
  public lawName = '';
  public filterQuery;
  public modalRef: BsModalRef;
  public gridLanguage;

  //#region EnglishData
  public categoryListEN = new Array<any>();
  public parentListEN = new Array();
  public chapterListEN = new Array();
  public lawListEN = new Array();
  public parentIdEN;
  public parentNameEN;
  public lawIdEN;
  public lawNameEN = '';
  //#endregion

  @ViewChild('editElement', { static: true }) editElement: AddEditLawCategoryComponent;

  columnsCategory = [
    { title: 'Order', name: 'viewOrder' },
    { title: 'Name', name: 'fullPath' },
    { title: 'Keyword', name: 'code' },
    // { title: 'Depth', name: 'depth' },
    // { title: 'BranchDepth', name: 'branchDepth' },
    // { title: 'Is visible?', name: 'isVisible' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  // languages
  english = languageEnum.English;
  albanian = languageEnum.Albaninan;

  // lawTypes
  lawGroup = lawCategoryType.LawGroup;
  law = lawCategoryType.Law;
  chapter = lawCategoryType.Chapter;

  constructor(
    private lawCategoryService: LawCategoryService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private storageService: StorageService
  ) { }

  albanianPaginationModel: PaginationModel = { TotalItems: 1, PageNumber: 1, PageSize: 10 };
  englishPaginationModel: PaginationModel = { TotalItems: 1, PageNumber: 1, PageSize: 10 };

  onAlbanianTablePaginationValuesChange(values: PaginationModel) {
    this.albanianPaginationModel = values;
    switch (this.state) {
      case PaginationState.LAW:
        this.getLaws();
        break;
      case PaginationState.CHAPTER:
        this.getChapters();
        break;
      case PaginationState.MAINCATEGORY:
        this.getMainCategories();
        break;
    }
  }

  onEnglishTablePaginationValuesChange(values: PaginationModel) {
    this.englishPaginationModel = values;
    switch (this.state) {
      case PaginationState.LAW:
        this.getLawsEN();
        break;
      case PaginationState.CHAPTER:
        this.getChaptersEN();
        break;
      case PaginationState.MAINCATEGORY:
        this.getMainCategoriesEN();
        break;
    }
  }

  ngOnInit() {
    this.setState = PaginationState.MAINCATEGORY;
    this.getMainCategories();
    this.getMainCategoriesEN();
  }

  //#region commons

  editItem(id, lang?) {
    this.editElement.catId = id;
    this.editElement.pageType = 'edit';
    this.editElement.language = lang;
    this.editElement.openModal();
  }

  addLawCategory(type) {
    this.editElement.pageType = 'add';
    this.editElement.lawType = type;
    this.editElement.language = this.albanian;
    this.editElement.openModal();
  }

  deleteLawCategory(id, lang?) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'LawCategory',
        language: lang
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

  reorder() {
    let data = this.defineReorder();
    this.lawCategoryService.reorder().subscribe((res: any) => {
      this.refreshGrid();
    }, error => {
      this.toast.error('Something Happend! Cannot get data, try again later.');
      this.spinner.hide();
    });
  }

  onActionClick(event: any, lang?) {
    switch (event.action) {
      case 'edit':
        this.editItem(event.id, lang);
        break;
      case 'delete':
        this.deleteLawCategory(event.id, lang);
        break;
      case 'translate':
        this.translate(event.id, this.english);
        break;
      default:
        break;
    }
  }

  translate(id, lang) {
    this.editElement.catId = id;
    this.editElement.language = lang;
    this.editElement.pageType = 'translate';
    this.editElement.openModal();
  }

  onTabEvent(language) {
    this.gridLanguage = language;
  }

  defineReorder() {
    let data = {};
    switch (this.gridLanguage) {
      case this.albanian: {
        if (this.parentId != null && this.parentId != 0) {
          if (this.lawId != null && this.chapterList.length == 0) {
            data = {
              parentId: this.parentId,
              lawId: this.lawId,
              chapters: false
            };
          } else if (this.lawId != null && this.chapterList.length != 0) {
            data = {
              parentId: this.parentId,
              lawId: this.lawId,
              chapters: true
            };
          }
        }
        return data;
      }
      case this.english: {
        if (this.parentIdEN != null && this.parentIdEN != 0) {
          if (this.lawIdEN != null && this.chapterListEN.length == 0) {
            data = {
              parentId: this.parentIdEN,
              lawId: this.lawIdEN,
              chapters: false
            };
          } else if (this.lawIdEN != null && this.chapterListEN.length != 0) {
            data = {
              parentId: this.parentIdEN,
              lawId: this.lawIdEN,
              chapters: true
            };
          }
        }
        return data;
      }
      default:
        break;
    }
  }

  refreshGrid() {
    this.parentId = null;
    this.getMainCategories();
    this.getMainCategoriesEN();
  }

  resetData() {
    this.lawList = new Array();
    this.categoryList = new Array();
    this.lawId = null;
    this.lawName = '';
    this.parentName = this.parentList.find(x => x.id == this.parentId).name;
  }

  setDataState() {
    this.storageService.removeStorage(storageLabelsEnum.LawCategoryDataState);
    let state = {
      parentId: this.parentId,
      parentList: this.parentList,
      lawId: this.lawId,
      lawList: this.lawList,
      chapterList: this.chapterList,
    };
    this.storageService.setStorage(storageLabelsEnum.LawCategoryDataState, JSON.stringify(state));
  }
  //#endregion

  //#region default language
  getLaws() {
    this.lawId = null;
    let pagination = new Pagination(this.albanianPaginationModel);
    this.lawCategoryService.getLawsByMainCategoryId(this.parentId, this.albanian, pagination).subscribe((res: any) => {
      this.setAlbanianPagination = res;
      this.lawList = res.body;
      this.categoryList = res.body;
      this.setState = PaginationState.LAW;
    });
  }

  getChapters() {
    let pagination = new Pagination(this.albanianPaginationModel);
    this.lawCategoryService.getChaptersByLawId(this.lawId, this.albanian, pagination).subscribe((res: any) => {
      this.setAlbanianPagination = res;
      this.chapterList = res.body;
      this.categoryList = res.body;
      this.setState = PaginationState.CHAPTER;
    });
  }

  getMainCategories() {
    this.spinner.show();
    this.lawList = new Array();
    this.lawId = null;
    this.parentId = null;
    this.parentName = '';
    this.lawName = '';
    let pagination = new Pagination(this.albanianPaginationModel)
    this.lawCategoryService.getAllMainCategories(this.albanian, pagination).subscribe((res: any) => {
      this.setAlbanianPagination = res;
      this.parentList = res.body;
      this.categoryList = res.body;
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

  onChangeLaw() {
    this.lawName = this.lawList.find(x => x.id == this.lawId).name;
  }
  //#endregion

  //#region englishSection

  getMainCategoriesEN() {
    this.spinner.show();
    this.lawListEN = new Array();
    this.lawIdEN = null;
    this.parentIdEN = null;
    this.parentNameEN = '';
    this.lawNameEN = '';
    let pagination = new Pagination(this.englishPaginationModel);
    this.lawCategoryService.getAllMainCategories(this.english, pagination).subscribe((res: any) => {
      this.setEnglishPagination = res;
      this.parentListEN = res.body;
      this.categoryListEN = res.body;
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

  getLawsEN() {
    this.lawIdEN = null;
    let pagination = new Pagination(this.englishPaginationModel);
    this.lawCategoryService.getLawsByMainCategoryId(this.parentIdEN, this.english, pagination).subscribe((res: any) => {
      this.setEnglishPagination = res;
      this.lawListEN = res.body;
      this.categoryListEN = res.body;
      this.setState = PaginationState.LAW;
    });
  }

  getChaptersEN() {
    let pagination = new Pagination(this.englishPaginationModel);
    this.lawCategoryService.getChaptersByLawId(this.lawIdEN, this.english, pagination).subscribe((res: any) => {
      this.setEnglishPagination = res;
      this.categoryListEN = res.body;
      this.chapterListEN = res.body;
      this.setState = PaginationState.CHAPTER;
    });
  }

  resetDataEN() {
    this.lawListEN = new Array();
    this.categoryListEN = new Array();
    this.lawIdEN = null;
    this.lawNameEN = '';
    this.parentNameEN = this.parentList.find(x => x.id == this.parentIdEN).name;
  }

  onChangeLawEN() {
    this.lawNameEN = this.lawListEN.find(x => x.id == this.lawIdEN).name;
  }

  set setState(state: PaginationState) {
    this.storageService.setStorage(storageLabelsEnum.PaginationState, state);
  }

  get state() {
    let state = +this.storageService.getStorage(storageLabelsEnum.PaginationState) as PaginationState;
    return state;
  }

  set setAlbanianPagination(res) {
    this.albanianPaginationModel.TotalItems = res.totalRecords;
    this.albanianPaginationModel.PageNumber = res.pageNumber;
    this.albanianPaginationModel.PageSize = res.pageSize;
  }
  set setEnglishPagination(res) {
    this.englishPaginationModel.TotalItems = res.totalRecords;
    this.englishPaginationModel.PageNumber = res.pageNumber;
    this.englishPaginationModel.PageSize = res.pageSize;
  }

  getSectionsExtentionForCombo() {
    this.albanianPaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 }
    this.getChapters();
  }
  //#endregion
}

enum PaginationState {
  LAW = 1,
  CHAPTER,
  MAINCATEGORY
}
