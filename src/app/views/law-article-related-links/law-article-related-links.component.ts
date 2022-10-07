import { Pagination } from './../../Interfaces/Pagination';
import { PaginateableTable } from './../../Interfaces/PaginateableTable';
import { LawCategoryService } from './../../services/law-category/law-category.service';
import { AddEditLawRelatedLinksComponent } from './../../add-edit-modals/add-edit-law-related-links/add-edit-law-related-links.component';
import { LawArticleRelatedLinksService } from './../../services/law-article-related-links/law-article-related-links.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { languageEnum } from '../../enums/languageEnum';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-law-article-related-links',
  templateUrl: './law-article-related-links.component.html',
  styleUrls: ['./law-article-related-links.component.scss']
})
export class LawArticleRelatedLinksComponent implements OnInit, PaginateableTable {

  public data = new Array();
  map = new Map<number, Map<number, boolean>>();
  public description = '';
  public title = '';
  public url = '';
  isValid: boolean;
  isDescriptionTouched: boolean = false;
  isUrlTouched: boolean = false;
  currentOpenedTab;

  // law data
  public lawGroupList = new Array();
  public chapterList = new Array();
  public lawList = new Array();
  public sectionList = new Array();
  public chapterId;
  public sectionId;
  public lawId;
  public lawgroupId;

  public language = languageEnum.Albaninan;
  english = languageEnum.English;
  albanian = languageEnum.Albaninan;

  public modalRef: BsModalRef;
  @ViewChild('editElement', { static: false }) editElement: AddEditLawRelatedLinksComponent;

  columns = [
    { title: 'Related Article', name: 'lawArticleTitle' },
    { title: 'Description', name: 'description' },
    { title: 'Url', name: 'url', property: 'isLink' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  constructor(
    private toast: ToastrService,
    private modalService: BsModalService,
    private lawArticleRelatedLinksService: LawArticleRelatedLinksService,
    private lawCategoryService: LawCategoryService,
    private spinner: NgxSpinnerService,
    private storageService: StorageService
  ) { }

  paginationModel: PaginationModel = { TotalItems: 0, PageNumber: 0, PageSize: 1 };

  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
    this.getSections(this.chapterId);
  }

  async ngOnInit() {
    this.getMainCategories();
    let stateData = JSON.parse(this.storageService.getStorage(storageLabelsEnum.RelatedLinksDataState));
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
        this.getRelatedLinksPerSection(this.sectionId);
      }
    } else {
      this.getRelatedLinksPerSection();
    }
  }

  setDataState() {
    this.storageService.removeStorage(storageLabelsEnum.RelatedLinksDataState);
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
    this.storageService.setStorage(storageLabelsEnum.RelatedLinksDataState, JSON.stringify(state));
  }

  openModal() {
    this.editElement.pageType = 'add';
    this.editElement.sectionId = this.sectionId;
    this.editElement.language = this.language;
    this.editElement.openModal();
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

  getRelatedLinksPerSection(event?) {
    this.spinner.show();
    this.data = new Array();
    this.sectionId = event;
    let pagination = new Pagination(this.paginationModel);
    this.lawArticleRelatedLinksService.getLawArticleRelatedLinksBySectionId(event, this.language, pagination).subscribe((res: any) => {
      this.paginationModel.TotalItems = res.totalRecords;
      this.paginationModel.PageNumber = res.pageNumber;
      this.paginationModel.PageSize = res.pageSize;
      this.data = res.body;
      this.spinner.hide();
    }, () => {
      this.toast.error('Something went wrong!Try again later.');
      this.spinner.hide();
    });
    this.setDataState();
  }

  onActionClick(event: any) {
    switch (event.action) {
      case 'delete':
        this.deleteLink(event.id);
        break;
      case 'edit':
        this.update(event.id);
        break;
      default:
        break;
    }
  }

  update(id) {
    this.editElement.pageType = 'edit';
    this.editElement.itemId = id;
    this.editElement.language = this.language;
    this.editElement.openModal();
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

  deleteLink(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'LawRelatedLink'
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isdeleted) {
        this.refresh();
      }
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  validateValues() {
    if (this.description.trim().length === 0 && this.isDescriptionTouched) {
      this.toast.error('Fill out description field!');
      this.isValid = false;
    }
    if (this.url.trim().length === 0 && this.isUrlTouched) {
      this.toast.error('Fill out url field!');
      this.isValid = false;
    }
  }

  onLanguageSelect(language) {
    this.resetValues();
    this.language = language;
    this.getMainCategories();
  }

  refresh() {
    this.getRelatedLinksPerSection(this.sectionId);
  }
}
