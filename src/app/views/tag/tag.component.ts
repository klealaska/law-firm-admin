import { StorageService } from './../../services/storage/storage.service';
import { languageEnum } from './../../enums/languageEnum';
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal/';
import { TagService } from '../../services/tag/tag.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { AddEditTagModalComponent } from '../../add-edit-modals/add-edit-tag-modal/add-edit-tag-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { Pagination } from '../../Interfaces/Pagination';
import { PaginateableTableWithLanguage } from '../../Interfaces/PaginableTableWithLanguage';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';

enum tabStateEnum {
  alTab = 'alTab',
  enTab = 'enTab',
  otherTab = 'otherTab',
}

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, PaginateableTableWithLanguage {

  public dataAlbanianTags = new Array<any>();
  public dataEnglishTags = new Array<any>();
  public dataOthersTags = new Array<any>();

  public modalRef: BsModalRef;
  public itemId;
  public filterQuery;

  // language props
  language: string = languageEnum.Albaninan;
  albanian: string = languageEnum.Albaninan;
  english: string = languageEnum.English;
  other: string = languageEnum.Other;

  // tab props
  activeTab: string = tabStateEnum.alTab;
  alTab: string = tabStateEnum.alTab;
  enTab: string = tabStateEnum.enTab;
  otherTab: string = tabStateEnum.otherTab;

  @ViewChild('editElement', { static: true }) editElement: AddEditTagModalComponent;

  columns = [
    { title: 'Name', name: 'name' },
    { title: 'Language', name: 'language' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  constructor(
    private tagService: TagService,
    private toast: ToastrService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private storageService: StorageService
  ) { }

  albanianPaginationModel: PaginationModel = { TotalItems: 1, PageNumber: 1, PageSize: 1 };
  englishPaginationModel: PaginationModel = { TotalItems: 1, PageNumber: 1, PageSize: 1 };
  otherPaginationModel: PaginationModel = { TotalItems: 1, PageNumber: 1, PageSize: 1 };

  async onAlbanianTablePaginationValuesChange(values: PaginationModel) {
    this.albanianPaginationModel = values;
    this.getDataAl();
  }

  async onEnglishTablePaginationValuesChange(values: PaginationModel) {
    this.englishPaginationModel = values;
    let pagination = new Pagination(this.englishPaginationModel);
    let result = await this.getDataByLanguage(languageEnum.English, pagination);
    this.dataEnglishTags = result.body;
    this.setEnglishPaginationModel = result;
  }

  async onOtherTablePaginationValuesChange(values: PaginationModel) {
    this.otherPaginationModel = values;
    let pagination = new Pagination(this.otherPaginationModel);
    let result = await this.getDataByLanguage(languageEnum.Other, pagination);
    this.dataOthersTags = result.body;
    this.setOtherPaginationModel = result;
  }

  async ngOnInit() {
    await this.checkStateOnInit();
  }

  getDataByLanguage(language: string, paginate: Pagination): Promise<any> {
    this.spinner.show();
    return new Promise(resolve => {
      this.tagService.getAll(paginate, language).subscribe((res: any) => {
        resolve(res);
        this.spinner.hide();
      }, error => {
        this.toast.error('Something happened. Cannot get data, try again later.');
        this.spinner.hide();
      });
    });
  }

  async checkStateOnInit() {
    this.activeTab = this.storageService.getStorage(storageLabelsEnum.TagTabState);
    if (this.activeTab != null) {
      await this.getDataByState(this.activeTab);
    } else {
      await this.getDataAl();
    }
  }

  async getDataByState(tabState) {
    switch (tabState) {
      case this.alTab:
        await this.getDataAl();
        this.language = this.albanian;
        break;
      case this.enTab:
        await this.getDataEn();
        this.language = this.english;
        break;
      case this.otherTab:
        await this.getDataOther();
        this.language = this.other;
        break;
    }
  }

  // async getAllData() {
  //   this.dataAlbanianTags = new Array<any>();
  //   this.dataEnglishTags = new Array<any>();
  //   this.dataOthersTags = new Array<any>();
  //   let pagination = new Pagination({ TotalItems: 0, PageNumber: 1, PageSize: 0 });
  //   this.getDataAl();
  //   let engResult = await this.getDataByLanguage(this.language, pagination);
  //   this.dataEnglishTags = engResult.body;
  //   this.setEnglishPaginationModel = engResult;
  //   let otherResult = await this.getDataByLanguage(languageEnum.Other, pagination);
  //   this.dataOthersTags = otherResult.body;
  //   this.setOtherPaginationModel = otherResult;
  // }

  openModal() {
    this.editElement.pageType = 'add';
    this.editElement.language = this.language;
    this.editElement.openModal();
  }

  deleteItem(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'Tag'
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(async () => {
      if (this.modalRef.content.isdeleted) {
        await this.getDataByState(this.activeTab);
      }
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  editItem(id) {
    this.editElement.pageType = 'edit';
    this.editElement.itemId = id;
    this.editElement.language = this.language;
    this.editElement.openModal();
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

  async onTabSelect(tab) {
    switch (tab) {
      case this.alTab:
        this.language = this.albanian;
        this.activeTab = this.alTab;
        this.setTabState(this.alTab);
        await this.getDataAl();
        break;
      case this.enTab:
        this.language = this.english;
        this.activeTab = this.enTab;
        this.setTabState(this.enTab);
        await this.getDataEn();
        break;
      case this.otherTab:
        this.language = this.other;
        this.activeTab = this.otherTab;
        this.setTabState(this.otherTab);
        await this.getDataOther();
        break;
    }
  }

  setTabState(state) {
    this.storageService.setStorage(storageLabelsEnum.TagTabState, state);
  }

  async getDataAl() {
    let pagination = new Pagination(this.albanianPaginationModel);
    let result = await this.getDataByLanguage(languageEnum.Albaninan, pagination);
    this.dataAlbanianTags = result.body;
    this.setAlbanianPaginationModel = result;
  }

  async getDataEn() {
    let pagination = new Pagination(this.englishPaginationModel);
    let result = await this.getDataByLanguage(languageEnum.English, pagination);
    this.dataEnglishTags = result.body;
    this.setEnglishPaginationModel = result;
  }

  async getDataOther() {
    let pagination = new Pagination(this.otherPaginationModel);
    let result = await this.getDataByLanguage(languageEnum.Other, pagination);
    this.dataOthersTags = result.body;
    this.setOtherPaginationModel = result;
  }

  set setAlbanianPaginationModel(result) {
    this.albanianPaginationModel.PageNumber = result.pageNumber;
    this.albanianPaginationModel.PageSize = result.pageSize;
    this.albanianPaginationModel.TotalItems = result.totalRecords;
  }
  set setEnglishPaginationModel(result) {
    this.englishPaginationModel.PageNumber = result.pageNumber;
    this.englishPaginationModel.PageSize = result.pageSize;
    this.englishPaginationModel.TotalItems = result.totalRecords;
  }
  set setOtherPaginationModel(result) {
    this.otherPaginationModel.PageNumber = result.pageNumber;
    this.otherPaginationModel.PageSize = result.pageSize;
    this.otherPaginationModel.TotalItems = result.totalRecords;
  }
}
