import { PaginateableTable } from './../../Interfaces/PaginateableTable';
import { Pagination } from './../../Interfaces/Pagination';
import { languageEnum } from './../../enums/languageEnum';
import { SendToMyAmendmentsComponent } from './../../components/send-to-my-amendments/send-to-my-amendments.component';
import { LawAmendmentsComponent } from './../law-amendments/law-amendments.component';
import { LawCategoryService } from './../../services/law-category/law-category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddEditLawSectionComponent } from '../../add-edit-modals/add-edit-law-section/add-edit-law-section.component';
import { ApproveModalComponent } from '../../components/approve-modal/approve-modal.component';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import * as moment from 'moment';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';

export enum tabStateEnum {
  LawTab = 'LawTab',
  AmendmentTab = 'AmendmentTab',
}

@Component({
  selector: 'app-laws',
  templateUrl: './laws.component.html',
  styleUrls: ['./laws.component.scss']
})
export class LawsComponent implements OnInit, PaginateableTable {

  public data: any;
  public chapterList = new Array();
  public lawList = new Array();
  public sectionData = new Array();
  public chapterId;
  public lawId;
  public parentList = new Array();
  public parentId;
  public modalRef: BsModalRef;

  // tab props
  activeTab;
  lawTab = tabStateEnum.LawTab;
  amendmentTab = tabStateEnum.AmendmentTab;

  // language properties
  public language = languageEnum.Albaninan;
  english = languageEnum.English;
  albanian = languageEnum.Albaninan;
  translateTableProp: boolean = true;

  @ViewChild('sectionModal', { static: false }) sectionModal: AddEditLawSectionComponent;
  @ViewChild('lawAmendment', { static: false }) lawAmendment: LawAmendmentsComponent;

  columns = [
    { title: 'Order', name: 'order' },
    { title: 'Keyword', name: 'code' },
    { title: 'Title', name: 'title' },
    { title: 'Approved By', name: 'approvedBy' }, // , property: 'isApprovedBy
    { title: 'Approved On', name: 'approvedOn' }, // , property: 'isApprovedOn'
    { title: 'Content', name: 'content', property: 'isContent' },
    { title: 'Status', name: 'status' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private lawCategoryService: LawCategoryService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private storageService: StorageService
  ) {
  }
  paginationModel: PaginationModel = { TotalItems: 0, PageNumber: 0, PageSize: 1 };
  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
    this.getSections(this.chapterId);
  }

  ngOnInit() {
    this.activeTab = this.storageService.getStorage(storageLabelsEnum.LawTabState);
    if (this.activeTab === this.lawTab || this.activeTab == null) {
      this.onSectionTabEvent();
    } else if (this.activeTab === this.amendmentTab) {
      this.onAmendmentTabEvent();
    }
  }

  addSection() {
    this.setDataState();
    this.router.navigate(['lawSection'], { queryParams: { language: `${this.language}`, pageType: 'add', chapterId: `${this.chapterId}` } });
  }

  onActionClick(event: any) {
    switch (event.action) {
      case 'delete':
        this.deleteSection(event.id);
        break;
      case 'send':
        this.sendToMyAmendments(event.id);
        break;
      case 'fullContent':
        this.seeFullContent(event.id);
        break;
      case 'translate':
        this.translate(event.id);
        break;
      default:
        break;
    }
  }

  deleteSection(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'Section',
        language: this.language
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(ApproveModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isSent) {
        this.getSections(this.chapterId);
      }
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  sendToMyAmendments(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        language: this.language
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(SendToMyAmendmentsComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isSent) {
        this.sectionData.find(x => x.id == id).status = this.modalRef.content.status;
      }
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  seeFullContent(id) {
    this.sectionModal.pageType = 'fullContent';
    this.sectionModal.itemId = id;
    this.sectionModal.chapterId = this.chapterId;
    this.sectionModal.openModal();
  }

  translate(id) {
    this.setDataState();
    this.router.navigate(['lawSection'], { queryParams: { language: `${this.english}`, pageType: 'translate', lawArticleId: `${id}`, chapterId: `${this.chapterId}` } });
  }

  refreshGrid() {
    this.getSections(this.chapterId);
  }

  onAmendmentTabEvent() {
    this.storageService.setStorage(storageLabelsEnum.LawTabState, tabStateEnum.AmendmentTab);
    this.lawAmendment.onLawAmendmentInit();
  }

  onSectionTabEvent() {
    this.getMainCategories();
    if (this.chapterId != null) {
      let stateData = JSON.parse(this.storageService.getStorage(storageLabelsEnum.LawDataState));
      if (stateData != null) {
        this.parentId = stateData.parentId;
        this.parentList = stateData.parentList;
        this.lawId = stateData.lawId;
        this.lawList = stateData.lawList;
        this.chapterList = stateData.chapterList;
        this.chapterId = stateData.chapterId;
        this.language = stateData.language;
        if (stateData.chapterList.length > 0) {
          this.getSections(this.chapterId);
        }
      }
    } else {
      this.getSections();
    }
    this.storageService.setStorage(storageLabelsEnum.LawTabState, tabStateEnum.LawTab);
  }

  //#region common
  getChapters(event) {
    this.chapterId = null;
    this.sectionData = new Array();
    this.lawCategoryService.getChaptersByLawId(event, this.language).subscribe((res: any) => {
      this.chapterList = res.body;
    });
  }

  getLaws(event) {
    this.lawId = null;
    this.chapterId = null;
    this.sectionData = new Array();
    this.chapterList = new Array();
    this.lawCategoryService.getLawsByMainCategoryId(event, this.language).subscribe((res: any) => {
      this.lawList = res.body;
    });
  }

  getSections(chapterId?) {
    this.spinner.show();
    this.sectionData = new Array();
    let pagination = new Pagination(this.paginationModel);
    this.lawCategoryService.getSectionsByChapterId(chapterId, this.language, pagination).subscribe((res: any) => {
      this.paginationModel.TotalItems = res.totalRecords;
      this.paginationModel.PageNumber = res.pageNumber;
      this.paginationModel.PageSize = res.pageSize;
      res.body.forEach(element => {
        element.approvedOn = moment(res.approvedOn).format('MMM do YYYY');
      });
      this.sectionData = res.body;
      this.spinner.hide();
    });
    this.setDataState();
  }

  getMainCategories() {
    this.lawCategoryService.getAllMainCategories(this.language).subscribe((res: any) => {
      this.parentList = res.body;
    });
  }
  //#endregion

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
    this.parentId = null;
    this.lawId = null;
    this.chapterId = null;
    this.parentList = new Array();
    this.lawList = new Array();
    this.chapterList = new Array();
    this.sectionData = new Array();
  }

  setDataState() {
    this.storageService.removeStorage(storageLabelsEnum.LawDataState);
    let state = {
      parentId: this.parentId,
      parentList: this.parentList,
      lawId: this.lawId,
      lawList: this.lawList,
      chapterList: this.chapterList,
      chapterId: this.chapterId,
      language: this.language
    };
    this.storageService.setStorage(storageLabelsEnum.LawDataState, JSON.stringify(state));
  }

  getSectionsExtentionForCombo(event) {
    this.paginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };
    this.getSections(event);
  }
}
