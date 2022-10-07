import { Pagination } from './../../Interfaces/Pagination';
import { PaginateableTable } from './../../Interfaces/PaginateableTable';
import { languageEnum } from './../../enums/languageEnum';
import { LawCategoryService } from './../../services/law-category/law-category.service';
import { AddEditLawAmendmentsComponent } from './../../add-edit-modals/add-edit-law-amendments/add-edit-law-amendments.component';
import { ToastrService } from 'ngx-toastr';
import { LawAmendmentService } from './../../services/law-amendment/law-amendment.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal/';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { ApproveModalComponent } from '../../components/approve-modal/approve-modal.component';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';

export enum tabStateEnum {
  LawTab = 'LawTab',
  AmendmentTab = 'AmendmentTab',
}

@Component({
  selector: 'app-law-amendments',
  templateUrl: './law-amendments.component.html',
  styleUrls: ['./law-amendments.component.scss']
})
export class LawAmendmentsComponent implements OnInit, PaginateableTable {

  public articleList = new Array();
  public amendmentList = new Array();
  public lawAmendment: any;
  public filterQuery;

  public chapterId;
  public lawId;
  public parentList = new Array();
  public parentId;
  chapterList;
  lawList;

  // language property
  public language = languageEnum.Albaninan;
  albanian = languageEnum.Albaninan;
  english = languageEnum.English;

  public modalRef: BsModalRef;
  @ViewChild('editElement', { static: false }) editElement: AddEditLawAmendmentsComponent;

  columns = [
    { title: 'Title', name: 'title' },
    { title: 'Keyword', name: 'code' },
    { title: 'Order', name: 'order' },
    // { title: 'Tags', name: 'tagList', property: 'isTag' },
    { title: 'Content', name: 'content', property: 'isContent' },
    { title: 'Editor', name: 'editor' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  constructor(
    private lawAmendmentService: LawAmendmentService,
    private lawCategoryService: LawCategoryService,
    private toast: ToastrService,
    private modalService: BsModalService,
    private router: Router,
    private storageService: StorageService
  ) { }

  paginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };

  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
    this.getSections(this.chapterId);
  }

  ngOnInit() {
    if (this.storageService.getStorage(storageLabelsEnum.LawTabState) === tabStateEnum.AmendmentTab) {
      this.onLawAmendmentInit();
    }
  }

  onLawAmendmentInit() {
    this.getMainCategories(this.language);
    if (this.chapterId != null) {
      let stateData = JSON.parse(this.storageService.getStorage(storageLabelsEnum.AmendmentDataState));
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
  }

  getChapters(event) {
    this.chapterId = null;
    this.amendmentList = new Array();
    this.lawCategoryService.getChaptersByLawId(event, this.language).subscribe((res: any) => {
      this.chapterList = res.body;
    });
  }

  getMainCategories(language) {
    this.lawCategoryService.getAllMainCategories(language).subscribe((res: any) => {
      this.parentList = res.body;
    });
  }

  getLaws(event) {
    this.lawId = null;
    this.chapterId = null;
    this.amendmentList = new Array();
    this.chapterList = new Array();
    this.lawCategoryService.getLawsByMainCategoryId(event, this.language).subscribe((res: any) => {
      this.lawList = res.body;
    });
  }

  getSections(chapterId?) {
    this.amendmentList = new Array();
    let pagination = new Pagination(this.paginationModel);
    this.lawAmendmentService.getLawAmendmentsByLawCategoryId(this.language, chapterId, pagination).subscribe((res: any) => {
      this.setPaginationModel = res;
      this.amendmentList = res.body;
    }, error => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  openModal() {
    this.editElement.pageType = 'add';
    this.editElement.openModal();
  }

  onActionClick(event: any) {
    switch (event.action) {
      case 'edit':
        this.editItem(event.id);
        break;
      case 'delete':
        this.deleteItem(event.id);
        break;
      default:
        break;
    }
  }

  editItem(id) {
    this.setState();
    this.router.navigate(['lawInAmendment'], { queryParams: { pageType: 'edit', itemId: id } });
  }

  deleteItem(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'LawAmendment'
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isdeleted) {
        this.getSections(this.chapterId);
      }
    }, error => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  sendToApprove(event) {
    const config: ModalOptions = {
      initialState: {
        id: event.id,
        item: 'LawAmendment',
        language: this.language
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(ApproveModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isSent) {
        this.amendmentList.find(x => x.id === event.id).status = this.modalRef.content.status;
      }
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  onLanguageSelect(language) {
    this.resetValues();
    this.language = language;
    this.getMainCategories(this.language);
  }


  resetValues() {
    this.chapterId = null;
    this.lawId = null;
    this.parentList = new Array();
    this.parentId = null;
    this.chapterList = new Array();
    this.lawList = new Array();
    this.amendmentList = new Array();
  }

  setState() {
    this.storageService.removeStorage(storageLabelsEnum.AmendmentDataState);
    let state = {
      parentId: this.parentId,
      parentList: this.parentList,
      lawId: this.lawId,
      lawList: this.lawList,
      chapterList: this.chapterList,
      chapterId: this.chapterId,
      language: this.language
    };
    this.storageService.setStorage(storageLabelsEnum.AmendmentDataState, JSON.stringify(state));
  }

  set setPaginationModel(res) {
    this.paginationModel.TotalItems = res.totalRecords;
    this.paginationModel.PageNumber = res.pageNumber;
    this.paginationModel.PageSize = res.pageSize;
  }

  getSectionsExtentionForCombo(event) {
    this.paginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 }
    this.getSections(event)
  }
}
