import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AddEditLawArticleHistoryComponent } from '../../add-edit-modals/add-edit-law-article-history/add-edit-law-article-history.component';
import { languageEnum } from '../../enums/languageEnum';
import { LawArticleHistoryService } from '../../services/law-article-history/law-article-history.service';
import { LawCategoryService } from '../../services/law-category/law-category.service';
import * as moment from 'moment';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { Pagination } from './../../Interfaces/Pagination';
import { PaginateableTable } from '../../Interfaces/PaginateableTable';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-law-article-history',
  templateUrl: './law-article-history.component.html',
  styleUrls: ['./law-article-history.component.scss']
})
export class LawArticleHistoryComponent implements OnInit, PaginateableTable {

  public data = new Array();
  public chapterList = new Array();
  public lawList = new Array();
  public sectionData = new Array();
  public chapterId;
  public lawId;
  public parentList = new Array();
  public parentId;
  public sectionList = new Array();
  public sectionId;
  public lawGroupList = new Array();
  public lawgroupId;

  public filterQuery;

  @ViewChild('sectionModal', { static: false }) sectionModal: AddEditLawArticleHistoryComponent;

  // language properties
  public language = languageEnum.Albaninan;
  english = languageEnum.English;
  albanian = languageEnum.Albaninan;
  translateTableProp: boolean = true;

  columns = [
    { title: 'Publish Date', name: 'publishedDate' },
    { title: 'Order', name: 'order' },
    { title: 'Keyword', name: 'code' },
    { title: 'Title', name: 'title' },
    { title: 'Approved By', name: 'approvedBy', property: 'isApprovedBy' },
    { title: 'Content', name: 'content', property: 'isContent' },
    // { title: 'Approved On', name: 'approvedOn', property: 'isApprovedOn' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  constructor(
    private lawCategoryService: LawCategoryService,
    private lawArticleHistoryService: LawArticleHistoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private storageService: StorageService
  ) { }

  paginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };
  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
    this.getArticleHistoryPerSection(this.sectionId);
  }

  ngOnInit() {
    this.getMainCategories();
    let stateData = JSON.parse(this.storageService.getStorage(storageLabelsEnum.LawHistoryDataState));
    if (stateData != null) {
      this.lawgroupId = stateData.parentId;
      this.lawGroupList = stateData.parentList;
      this.lawId = stateData.lawId;
      this.lawList = stateData.lawList;
      this.chapterList = stateData.chapterList;
      this.chapterId = stateData.chapterId;
      this.sectionId = stateData.sectionId;
      this.sectionList = stateData.sectionList;
      this.language = stateData.language;
      if (stateData.sectionList.length > 0) {
        this.getArticleHistoryPerSection(this.sectionId);
      }
    } else {
      this.getArticleHistoryPerSection();
    }
  }

  setDataState() {
    this.storageService.removeStorage(storageLabelsEnum.LawHistoryDataState);
    let state = {
      parentId: this.lawgroupId,
      parentList: this.lawGroupList,
      lawId: this.lawId,
      lawList: this.lawList,
      chapterList: this.chapterList,
      chapterId: this.chapterId,
      sectionId: this.sectionId,
      sectionList: this.sectionList,
      language: this.language
    };
    this.storageService.setStorage(storageLabelsEnum.LawHistoryDataState, JSON.stringify(state));
  }


  getMainCategories() {
    this.lawCategoryService.getAllMainCategories(this.language).subscribe((res: any) => {
      this.lawGroupList = res.body;
    });
  }

  getLaws(event) {
    this.lawId = null;
    this.chapterId = null;
    this.sectionId = null;
    this.sectionList = new Array();
    this.lawList = new Array();
    this.chapterList = new Array();
    this.data = new Array();
    this.lawCategoryService.getLawsByMainCategoryId(event, this.language).subscribe((res: any) => {
      this.lawList = res.body;
    });
  }

  getChapters(event) {
    this.chapterId = null;
    this.sectionList = new Array();
    this.sectionId = null;
    this.data = new Array();
    this.lawCategoryService.getChaptersByLawId(event, this.language).subscribe((res: any) => {
      this.chapterList = res.body;
    });
  }

  getSections(chapterId) {
    this.sectionId = null;
    this.data = new Array();
    this.lawCategoryService.getSectionsByChapterId(chapterId, this.language).subscribe(async (res: any) => {
      this.sectionList = res.body;
    });
  }

  getArticleHistoryPerSection(sectionId?) {
    let pagination = new Pagination(this.paginationModel);
    this.spinner.show();
    this.data = new Array();
    this.sectionId = sectionId;
    this.lawArticleHistoryService.getLawArticleHistoryBySectionId(this.language, sectionId, pagination).subscribe((res: any) => {
      this.setPagination = res;
      this.data = res.body;
      this.data.forEach(element => {
        element.publishedDate = moment(new Date(element.publishedDate)).format('DD/MM/YYYY');
      });
      this.spinner.hide();
    }, () => {
      this.toast.error('Something went wrong!Try again later.');
      this.spinner.hide();
    });
    this.setDataState();
  }


  onLanguageSelect(language) {
    this.resetValues();
    if (language === this.albanian) {
      this.language = this.albanian;
      this.translateTableProp = true;
    } else {
      this.language = this.english;
      this.translateTableProp = false;
    }
    this.getMainCategories();
  }


  resetValues() {
    this.sectionId = null;
    this.lawId = null;
    this.lawgroupId = null;
    this.chapterId = null;
    this.lawGroupList = new Array();
    this.lawList = new Array();
    this.chapterList = new Array();
    this.data = new Array();
    this.sectionList = new Array();
  }

  onActionClick(event: any) {
    switch (event.action) {
      case 'fullContent':
        this.seeFullContent(event.id);
        break;
      default:
        break;
    }
  }

  seeFullContent(id) {
    this.sectionModal.pageType = 'fullContent';
    this.sectionModal.itemId = id;
    this.sectionModal.language = this.language;
    this.sectionModal.openModal();
  }

  set setPagination(res) {
    this.paginationModel.TotalItems = res.totalRecords;
    this.paginationModel.PageNumber = res.pageNumber;
    this.paginationModel.PageSize = res.pageSize;
  }

}
