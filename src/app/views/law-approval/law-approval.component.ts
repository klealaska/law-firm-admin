import { Pagination } from './../../Interfaces/Pagination';
import { PaginateableTable } from './../../Interfaces/PaginateableTable';
import { StorageService } from './../../services/storage/storage.service';
import { languageEnum } from './../../enums/languageEnum';
import { LawAmendmentService } from './../../services/law-amendment/law-amendment.service';
import { LawService } from './../../services/law/law.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { PublishModalComponent } from '../../components/publish-modal/publish-modal.component';
import { Router } from '@angular/router';
import { ApproveEditLawViewComponent } from '../approve-edit-law-view/approve-edit-law-view.component';
import { LawCategoryService } from '../../services/law-category/law-category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InternalObservablesService } from '../../services/internal-observables/internal-observables.service';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';

@Component({
  selector: 'app-law-approval',
  templateUrl: './law-approval.component.html',
  styleUrls: ['./law-approval.component.scss']
})
export class LawApprovalComponent implements OnInit, PaginateableTable {

  public data: any;
  public deletionData: any;
  public filterQuery;
  public chapterId;
  public lawId;
  public parentList = new Array();
  public parentId;
  chapterList;
  lawList;
  state;

  tabStateApprove: boolean = true;
  tabStateDelete: boolean = false;
  language = languageEnum.Albaninan;
  albanian = languageEnum.Albaninan;
  english = languageEnum.English;

  public modalRef: BsModalRef;
  @ViewChild('editElement', { static: false }) editElement: ApproveEditLawViewComponent;

  pendingColumns = [
    { title: 'Status', property: 'lawStatus' },
    { title: 'Title', name: 'title' },
    { title: 'Keyword', name: 'code' },
    { title: 'Editor', name: 'editor' },
    { title: 'Order', name: 'order' },
    // { title: 'Tags', name: 'tagList', property: 'isTag' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  deleteColumns = [
    { title: 'Status', property: 'lawStatus' },
    { title: 'Title', name: 'title' },
    { title: 'Keyword', name: 'code' },
    // { title: 'Tags', name: 'tags', property: 'isTag' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  constructor(
    private lawService: LawService,
    private lawAmendmentService: LawAmendmentService,
    private toast: ToastrService,
    private modalService: BsModalService,
    private router: Router,
    private lawCategoryService: LawCategoryService,
    private spinner: NgxSpinnerService,
    private internalObservablesService: InternalObservablesService,
    private storageService: StorageService
  ) { }


  paginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };
  deletionTablePaginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };

  onDeletionTablePaginationValuesChange(values: PaginationModel) {
    this.deletionTablePaginationModel = values;
  }

  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
    this.getLawAmendments(this.chapterId);
  }

  ngOnInit() {
    this.getData();
    if (this.chapterId != null) {
      let stateData = JSON.parse(this.storageService.getStorage(storageLabelsEnum.LawApprovalDataState));
      if (stateData != null) {
        this.parentId = stateData.parentId;
        this.parentList = stateData.parentList;
        this.lawId = stateData.lawId;
        this.lawList = stateData.lawList;
        this.chapterList = stateData.chapterList;
        this.chapterId = stateData.chapterId;
        this.language = stateData.language;
        if (stateData.chapterList.length > 0) {
          this.getLawAmendments(this.chapterId);
        }
      }
    } else {
      this.getLawAmendments();
    }
  }

  getData() {
    this.getMainCategories(this.language);
  }

  getLawAmendments(chapterId?) {
    this.spinner.show();
    this.data = new Array();
    let pagination = new Pagination(this.paginationModel);
    this.lawAmendmentService.getLawsForApproval(chapterId, this.language, pagination).subscribe((res: any) => {
      this.paginationModel.TotalItems = res.totalRecords;
      this.paginationModel.PageNumber = res.pageNumber;
      this.paginationModel.PageSize = res.pageSize;
      this.data = res.body;
      this.spinner.hide();
    }, () => {
      this.toast.error('Something went wrong!Try again later.');
      this.spinner.hide();
    });
  }

  getLawsForDeletion() {
    this.spinner.show();
    let pagination = new Pagination(this.deletionTablePaginationModel);
    this.lawService.getLawsForDeletionApproval(this.language, pagination).subscribe((res: any) => {
      this.deletionTablePaginationModel.TotalItems = res.totalRecords;
      this.deletionTablePaginationModel.PageNumber = res.pageNumber;
      this.deletionTablePaginationModel.TotalItems = res.totalRecords;
      this.deletionData = res.body;
      this.spinner.hide();
    }, (error) => {
      this.toast.error('Something went wrong!Try again later.');
      this.spinner.hide();
    });
  }

  tabSelected(e) {
    this.getLawsForDeletion();
  }

  getChapters(event) {
    this.chapterId = null;
    this.data = new Array();
    this.lawCategoryService.getChaptersByLawId(event, this.language).subscribe((res: any) => {
      this.chapterList = res.body;
    });
    this.setState();
  }

  getMainCategories(language) {
    this.lawCategoryService.getAllMainCategories(language).subscribe((res: any) => {
      this.parentList = res.body;
    });
  }

  getLaws(event) {
    this.lawId = null;
    this.chapterId = null;
    this.data = new Array();
    this.chapterList = new Array();
    this.lawCategoryService.getLawsByMainCategoryId(event, this.language).subscribe((res: any) => {
      this.lawList = res.body;
    });
  }

  onActionClick(event: any, lawType: string) {
    switch (event.action) {
      case 'edit':
        this.editItem(event.id, lawType);
        break;
      case 'delete':
        this.deleteItem(event.id, lawType);
        break;
      case 'fullContent':
        this.editItem(event.id, 'fullContent');
        break;
      default:
        break;
    }
  }

  editItem(id, lawType) {
    this.setState();
    this.router.navigate(['approveLaw'], { queryParams: { pageType: 'edit', language: this.language, lawType: lawType, itemId: id } });
  }

  deleteItem(id, lawType) {
    if (lawType === 'deletionApproval') {
      const config: ModalOptions = {
        initialState: {
          id: id,
          item: 'Law Section'
        },
        ignoreBackdropClick: true
      };
      this.modalRef = this.modalService.show(DeleteModalComponent, config);
      this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
      this.modalService.onHide.subscribe(() => {
        if (this.modalRef.content.isdeleted) {
          this.getLawsForDeletion();
        }
      }, error => {
        this.toast.error('Error! Something went wrong.');
      });
    } else if (lawType === 'pendingApproval') {
      const config: ModalOptions = {
        initialState: {
          id: id,
          item: 'LawApproval'
        }
      };
      this.modalRef = this.modalService.show(DeleteModalComponent, config);
      this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
      this.modalService.onHide.subscribe(() => {
        if (this.modalRef.content.isdeleted) {
          this.getLawAmendments(this.chapterId);
        }
      }, () => {
        this.toast.error('Error! Something went wrong.');
      });
    }
  }

  publishLaw(event) {
    const config: ModalOptions = {
      initialState: {
        id: event.id,
        item: 'LawSection',
        language: this.language
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(PublishModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.internalObservablesService.closeModal.subscribe(() => {
      if (this.modalRef.content.isPublished) {
        // let law = this.data.indexOf(this.data.find(x => x.id == event.id));
        // this.data.splice(law, 1);
        this.getLawAmendments(this.chapterId);
        this.modalRef.content.isPublished = false;
      }
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  onSwitchEvent(event, type) {
    this.resetValues();
    this.language = event.target.checked ? this.albanian : this.english;
    this.getLawsForDeletion();
    this.getMainCategories(this.language);
  }

  onLanguageSelect(language) {
    this.resetValues();
    this.language = language;
    this.getLawsForDeletion();
    this.getMainCategories(this.language);
  }


  resetValues() {
    this.data = new Array();
    this.deletionData = new Array();
    this.chapterId = null;
    this.lawId = null;
    this.parentList = new Array();
    this.parentId = null;
    this.chapterList = new Array();
    this.lawList = null;
  }

  setState() {
    this.storageService.removeStorage(storageLabelsEnum.LawApprovalDataState);
    let state = {
      parentId: this.parentId,
      parentList: this.parentList,
      lawId: this.lawId,
      lawList: this.lawList,
      chapterList: this.chapterList,
      chapterId: this.chapterId,
      language: this.language
    };
    this.storageService.setStorage(storageLabelsEnum.LawApprovalDataState, JSON.stringify(state));
  }
}
