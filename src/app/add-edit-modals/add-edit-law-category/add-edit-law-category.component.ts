import { lawCategoryType } from './../../enums/lawCategoryType';
import { languageEnum } from './../../enums/languageEnum';
import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { LawCategoryService } from '../../services/law-category/law-category.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-law-category.component.html',
  styleUrls: ['./add-edit-law-category.component.scss']
})
export class AddEditLawCategoryComponent implements OnInit {

  public language;
  albanian = languageEnum.Albaninan;
  english = languageEnum.English;

  public catName = '';
  public catFullPath = '';
  public catParentId;
  public catViewOrder = '';
  public catIsVisible = false;
  public catOrder;
  public catCode;
  public catId;
  public catBranchDepth = 0;
  public catDepth = 0;
  public truncViewOrder = '';
  public originalOrder = '';
  public originalParentId = '';
  public selectedCategory;
  public parentCategories = Array<Object>();
  public categoryType;

  lawType;
  isSubmitted: boolean = false;
  isValid: boolean = true;

  // lawTypes
  lawGroup = lawCategoryType.LawGroup;
  law = lawCategoryType.Law;
  chapter = lawCategoryType.Chapter;

  // categories lists
  public rootList = new Array();
  public lawGroupList = new Array();
  public lawList = new Array();
  lawId;
  public chapterList = new Array();

  public rootCategory = {
    id: 0,
    name: 'Root',
    code: 'root',
    parentId: 0,
    depth: 0,
    fullPath: 'Root',
    isVisible: true,
    order: 0,
    parent: {},
    viewOrder: '0',
    branchDepth: 0,
    children: [],
  };

  @Input() pageType: any;
  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @Output() public submited: EventEmitter<any> = new EventEmitter();
  @Output() public closeModal: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-lg'
  };

  // page types
  translate = 'translate';
  edit = 'edit';
  add = 'add';

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private categoryService: LawCategoryService
  ) { }

  ngOnInit() {
  }

  openModal() {
    this.fillDropdown(false);
    this.isSubmitted = false;
    if (this.pageType === this.add) {
      this.resetValues();
    }
    if (this.pageType === this.translate) {
      this.modalService.onShow.subscribe(() => {
        this.resetValuesOnTranslate();
        this.getDataForTranslation(this.catId);
      });
    }
    if (this.pageType === this.edit) {
      this.modalService.onShow.subscribe(() => {
        this.getData();
      });
    }
    this.fillDropdown(false);
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.pageType === this.edit) {
      this.update();
    } else if (this.pageType === this.add) {
      this.addData();
    } else if (this.pageType === this.translate) {
      this.addTranslation();
    }
  }

  addData() {
    this.isValid = true;
    const data = {
      name: this.catName,
      parentId: this.lawType == this.lawGroup ? 0 : this.catParentId,
      order: this.catOrder,
      code: this.catCode,
      isChapter: this.lawType === lawCategoryType.Chapter ? true : false
    };
    this.validateStringData(this.catName, 'category name');
    this.validateStringData(this.catCode, 'keyword');
    this.validateData(this.catOrder, 'order');
    this.validateData(data.parentId, 'parent');
    if (this.isValid) {
      this.categoryService.postAdd(data, this.albanian).subscribe(() => {
        this.toast.success('Added successfully!');
        this.modalRef.hide();
        this.submited.emit();
      }, error => {
        if (error.status === 403) {
          this.toast.warning('Keyword exists, try another option.');
        } else {
          this.toast.error('Error! Something went wrong, try again later.');
          this.modalRef.hide();
          this.resetValues();
        }
      });
    } else {
      this.isSubmitted = false;
    }
  }

  getDataForTranslation(id) {
    this.categoryService.getById(id, this.albanian).subscribe((res: any) => {
      console.log(res);

      // this.catId = res.id;
      this.catOrder = res.order;
      this.truncViewOrder = (res.viewOrder.slice(0, -2) === '') ? 'Root' : res.viewOrder.slice(0, -2);
      this.catViewOrder = res.viewOrder;
      this.catParentId = res.parentId;
      this.categoryType = res.isChapter;
    });
  }

  addTranslation() {
    this.isValid = true;
    const data = {
      id: this.catId,
      name: this.catName,
      parentId: this.catParentId,
      order: this.catOrder,
      code: this.catCode,
      isChapter: this.categoryType
    };
    console.log(data);

    this.validateStringData(this.catName, 'category name');
    this.validateStringData(this.catCode, 'keyword');
    this.validateData(this.catOrder, 'order');
    // this.validateData(data.parentId, 'parent');
    if (this.isValid) {
      this.categoryService.addTranslation(data, this.english).subscribe(() => {
        this.toast.success('Added successfully!');
        this.modalRef.hide();
        this.submited.emit();
      }, error => {
        if (error.status === 403) {
          this.toast.warning('Keyword exists, try another option.');
        } else {
          this.toast.error('Error! Something went wrong, try again later.');
          this.modalRef.hide();
          this.resetValues();
        }
      });
    } else {
      this.isSubmitted = false;
    }
  }


  update() {
    this.isValid = true;
    const dataToUpdate = {
      id: this.catId,
      name: this.catName,
      parentId: this.catParentId,
      order: this.catOrder,
      isVisible: this.catIsVisible,
      isChapter: this.categoryType
    };
    this.validateStringData(this.catName, 'category name');
    this.validateStringData(this.catCode, 'keyword');
    this.validateData(this.catOrder, 'order');
    this.validateData(dataToUpdate.parentId, 'parent');
    if (this.isValid) {
      this.categoryService.update(dataToUpdate, this.language).subscribe(() => {
        this.toast.success('Updated successfully!');
        this.modalRef.hide();
        this.submited.emit();
      }, error => {
        this.toast.error('Error! Cannot edit, try again later.');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
  }

  getData() {
    this.categoryService.getById(this.catId, this.language).subscribe((res: any) => {
      this.catName = res.name;
      this.catFullPath = res.fullPath;
      this.catOrder = res.order;
      this.originalOrder = res.order;
      this.truncViewOrder = (res.viewOrder.slice(0, -2) === '') ? 'Root' : res.viewOrder.slice(0, -2);
      this.catViewOrder = res.viewOrder;
      this.catIsVisible = res.isVisible;
      this.catCode = res.code;
      this.catDepth = res.depth;
      this.catBranchDepth = res.branchDepth;
      this.catParentId = res.parentId;
      this.originalParentId = res.parentId;
      this.selectedCategory = this.catParentId;
      this.categoryType = res.isChapter;
      this.parentCategories = Array<Object>();
      this.getCategories(false);
      if (this.pageType === this.add) {
        this.truncViewOrder = 'Root';
        this.selectedCategory = 0;
      }
    });
  }

  fillDropdown(hasLimit) {
    this.selectedCategory = null;
    this.categoryService.getAll(hasLimit, this.language).subscribe((res: any) => {
      this.rootList.push(this.rootCategory);
      res.forEach(cat => {
        cat.fullPath = cat.viewOrder + '.' + cat.fullPath;
        if (cat.parentId == null || cat.parentId == 0) {
          this.lawGroupList.push(cat);
        } else if (cat.depth == 2) {
          this.lawList.push(cat);
        }
      });
    });
  }

  getCategories(hasLimit) {
    this.categoryService.getAll(hasLimit, this.language).subscribe((res: any) => {
      res.forEach(cat => {
        cat.fullPath = cat.viewOrder + '.' + cat.fullPath;
        if (cat.parent == null) {
          cat.parent = {};
        }
        if (cat.id == this.catId) {
          cat['disabled'] = true;
        }
        if (cat.parentId != this.catId && cat.parent.parentId != this.catId) {
          if (cat.depth + this.catBranchDepth > 3) {
            cat['disabled'] = true;
          }
          if (cat.depth > 2 && this.selectedCategory != cat.id) {
            cat['disabled'] = true;
          }
        }
      });
      this.parentCategories = res;
      this.parentCategories.unshift(this.rootCategory);
    });
  }

  onChange($event) {
    if ($event.id == this.originalParentId) {
      this.truncViewOrder = ($event.viewOrder == '') ? 'Root' : $event.viewOrder;
      this.catOrder = this.originalOrder;
    } else {
      this.truncViewOrder = $event.viewOrder;
      this.catOrder = '';
    }
    this.catParentId = $event.id;
  }

  onHideModal() {
    this.closeModal.emit('cancel');
    this.modalRef.hide();
  }

  resetValues() {
    this.catId = null;
    this.catName = '';
    this.selectedCategory = null;
    this.catParentId = null;
    this.catOrder = null;
    this.catIsVisible = true;
    this.categoryType = false;
    this.catCode = '';
    this.truncViewOrder = '';
  }

  resetValuesOnTranslate() {
    this.catName = '';
    this.catParentId = null;
    this.catOrder = null;
    this.catIsVisible = true;
    this.catCode = '';
    this.truncViewOrder = '';
  }


  validateStringData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    } else {
      if (id.toLowerCase() == 'keyword') {
        let regex = new RegExp('^(\\d|\\w)+$');
        let result = regex.test(attr);
        if (!result) {
          this.isValid = false;
          this.toast.warning(`Please set a valid Keyword!`);
        }
      }
    }
  }

  validateData(attr, id: string) {
    if (attr == null) {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }
}
