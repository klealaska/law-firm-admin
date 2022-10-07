import { PaginateableTableWithLanguage } from './../../Interfaces/PaginableTableWithLanguage';
import { PaginateableTable } from './../../Interfaces/PaginateableTable';
import { AddEditHomepageVideoComponent } from './../../add-edit-modals/add-edit-homepage-video/add-edit-homepage-video.component';
import { HomepageVideoService } from './../../services/homepage-video/homepage-video.service';
import { AddEditHomepageLawConfigComponent } from './../../add-edit-modals/add-edit-homepage-law-config/add-edit-homepage-law-config.component';
import { ToastrService } from 'ngx-toastr';
import { HomepageLawConfigurationService } from './../../services/homepage-law-configuration/homepage-law-configuration.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal/';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { languageEnum } from '../../enums/languageEnum';
import { PaginationModel } from '../../Interfaces/PaginationModel';
import { Pagination } from '../../Interfaces/Pagination';
import { StorageService } from '../../services/storage/storage.service';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';

enum tabStateEnum {
  homepageTab = 'homepageTab',
  videoTab = 'videoTab',
}

@Component({
  selector: 'app-homepage-law-configuration',
  templateUrl: './homepage-law-configuration.component.html',
  styleUrls: ['./homepage-law-configuration.component.scss']
})
export class HomepageLawConfigurationComponent implements OnInit, PaginateableTableWithLanguage, PaginateableTable {

  public lawData: any;
  public lawDataEN: any;
  public videoData: any;
  public modalRef: BsModalRef;
  public nameList = new Array();
  public filterQuery;

  // language props
  public english = languageEnum.English;
  public albanian = languageEnum.Albaninan;
  public language = languageEnum.Albaninan;

  // tab props
  // tab state props
  activeTab: string = tabStateEnum.homepageTab;
  homepageTab: string = tabStateEnum.homepageTab;
  videoTab: string = tabStateEnum.videoTab;

  @ViewChild('modal', { static: false }) modal: AddEditHomepageLawConfigComponent;
  @ViewChild('videoModal', { static: false }) videoModal: AddEditHomepageVideoComponent;

  lawColumns = [
    { title: 'Name', name: 'lawName' },
    { title: 'Title', name: 'title', },
    { title: 'Link', name: 'link', property: 'isLink' },
    { title: 'Color', name: 'colorOverlay' },
    { title: 'Description', name: 'description', property: 'isContent' },
    { title: 'Image', name: 'imageUrl', property: 'isImage' },
    { title: 'Is Visible', name: 'isVisible', property: 'isVisible', class: 'text-center' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  videoColumns = [
    { title: 'Title', name: 'title', },
    { title: 'Link', name: 'link', property: 'isLink' },
    { title: 'Is Visible', name: 'isVisible', property: 'isVisible', class: 'text-center' },
    { title: 'Actions', property: 'actions', class: 'text-center' }
  ];

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private configurationService: HomepageLawConfigurationService,
    private videoService: HomepageVideoService,
    private spinner: NgxSpinnerService,
    private storageService: StorageService
  ) {
  }
  albanianPaginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };
  englishPaginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };
  paginationModel: PaginationModel = { TotalItems: 0, PageNumber: 1, PageSize: 1 };

  onAlbanianTablePaginationValuesChange(values: PaginationModel) {
    this.albanianPaginationModel = values;
    this.getLawData();
  }

  onEnglishTablePaginationValuesChange(values: PaginationModel) {
    this.englishPaginationModel = values;
    this.getLawData();
  }

  onPaginationValuesChange(values: PaginationModel) {
    this.paginationModel = values;
    this.getLawData();
    this.getVideoData();
  }

  ngOnInit() {
    this.checkStateOnInit(JSON.parse(this.storageService.getStorage(storageLabelsEnum.HomepageConfigTabState)));
  }

  checkStateOnInit(state) {
    if (state != null) {
      if (state.tab == tabStateEnum.homepageTab) {
        this.language = state.language;
        this.activeTab = tabStateEnum.homepageTab;
        this.getLawData();
      } else {
        this.activeTab = tabStateEnum.videoTab;
        this.getVideoData();
      }
    } else {
      this.getLawData();
    }
  }

  setTabState(tabState, language?) {
    this.storageService.removeStorage(storageLabelsEnum.HomepageConfigTabState);
    let result = {
      language: language,
      tab: tabState
    };
    this.storageService.setStorage(storageLabelsEnum.HomepageConfigTabState, JSON.stringify(result));
  }


  getLawData() {
    this.spinner.show();
    let paginate = new Pagination(this.albanianPaginationModel);
    this.configurationService.getAll(this.language, paginate).subscribe((res: any) => {
      this.albanianPaginationModel.TotalItems = res.totalRecords;
      this.albanianPaginationModel.PageNumber = res.pageNumber;
      this.albanianPaginationModel.PageSize = res.pageSize;
      this.lawData = res.body;
      res.body.forEach(name => {
        this.nameList.push(name.lawName);
      });
      this.spinner.hide();
    }, () => {
      this.toast.error('Something went wrong.Try again later.');
      this.spinner.hide();
    });
  }

  getVideoData() {
    let paginate = new Pagination(this.paginationModel);
    this.videoService.getAll(paginate).subscribe((res: any) => {
      this.paginationModel.TotalItems = res.totalRecords;
      this.paginationModel.PageNumber = res.pageNumber;
      this.paginationModel.PageSize = res.pageSize;
      this.videoData = res.body;
    });
  }

  openLawModal(lang) {
    this.nameList = new Array();
    this.modal.pageType = 'add';
    this.modal.language = lang;
    this.modal.openModal();
  }

  openVideoModal() {
    this.videoModal.pageType = 'add';
    this.videoModal.openModal();
  }

  onActionClick(event: any, name: string, lang?: string) {
    switch (event.action) {
      case 'edit': {
        name === 'law'
          ? this.editLawItem(event.id, lang)
          : this.editVideoItem(event.id);
      }
        break;
      case 'delete':
        this.deleteItem(event.id);
        break;
      case 'translate':
        this.translate(event.id, this.english);
        break;
      default:
        break;
    }
  }

  editLawItem(id, lang) {
    this.modal.pageType = 'edit';
    this.modal.itemId = id;
    this.modal.language = lang;
    this.modal.openModal();
  }

  editVideoItem(id) {
    this.videoModal.pageType = 'edit';
    this.videoModal.itemId = id;
    this.videoModal.openModal();
  }

  translate(id, lang) {
    this.modal.pageType = 'translate';
    this.modal.itemId = id;
    this.modal.language = lang;
    this.modal.openModal();
  }

  deleteItem(id) {
    const config: ModalOptions = {
      initialState: {
        id: id,
        item: 'Video'
      },
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, config);
    this.modalRef.setClass('modal-sm delete-modal modal-dialog-centered');
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isdeleted) {
        this.getVideoData();
      }
    }, error => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  statusEvent(event, language) {
    this.configurationService.updateStatus(event.id, language).subscribe(() => {
      event.value
        ? this.toast.success('Added at homepage!')
        : this.toast.success('Removed from homepage!');
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  videoStatusEvent(event) {
    this.videoService.updateStatus(event.id).subscribe(() => {
      event.value
        ? this.toast.success('Added at homepage!')
        : this.toast.success('Removed from homepage!');
    }, () => {
      this.toast.error('Error! Something went wrong.');
    });
  }

  onLanguageSelect(language) {
    this.language = language;
    this.getLawData();
  }

  onTabSelect(type) {
    switch (type) {
      case tabStateEnum.homepageTab:
        {
          this.activeTab = this.homepageTab;
          this.setTabState(tabStateEnum.homepageTab, this.language);
          this.getLawData();
          break;
        }
      case tabStateEnum.videoTab:
        {
          this.activeTab = this.videoTab;
          this.setTabState(tabStateEnum.videoTab);
          this.getVideoData();
          break;
        }
      default:
        break;
    }
  }
}
