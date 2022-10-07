import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LawCategoryService } from './../../services/law-category/law-category.service';
import { ToastrService } from 'ngx-toastr';
import { LawService } from './../../services/law/law.service';
import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';

@Component({
  selector: 'app-add-edit-laws',
  templateUrl: './add-edit-laws.component.html',
  styleUrls: ['./add-edit-laws.component.scss']
})
export class AddEditLawsComponent implements OnInit {

  public title = '';
  public code = '';
  public itemId;
  public isChapter: boolean = false;
  public categoryId: number;
  public categoryList = new Array();
  public sectionList = new Array();
  isCodeValid: boolean;

  pageType: any;
  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @Output() public submited: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-lg'
  };
  isValid: boolean;
  inputsArray = new Array(1);

  constructor(
    private lawService: LawService,
    private toast: ToastrService,
    private modalService: BsModalService,
    private categoryService: LawCategoryService
  ) { }

  ngOnInit() {
    this.getCategoryList();
  }

  openModal() {
    this.defaultValues();
    this.modalRef = this.modalService.show(this.template, this.config);
    if (this.pageType === 'edit') {
      this.getlawById();
    }
  }

  getCategoryList() {
    this.categoryService.getAll(false).subscribe((res: any) => {
      this.categoryList = res;
    });
  }

  getlawById() {
    this.lawService.getById(this.itemId).subscribe((res: any) => {
      this.title = res.title;
      this.categoryId = res.category.id;
      this.code = res.code;
    });
  }

  onSubmit() {
    if (this.pageType === 'edit') {
      this.update();
    } else if (this.pageType === 'add') {
      // this.add();
    }
  }

  // add() {
  //   this.isValid = true;
  //   const data = {
  //     title: this.title,
  //     code: this.code !== null || this.code.length !== 0 ? this.code.trim() : '',
  //     categoryId: this.categoryId,
  //     subcategoryTitles: this.sectionList
  //   };
  //   this.validateStringData(this.title, 'title');
  //   this.validateStringData(this.code, 'keyword');
  //   this.validateNullOrUndifinedData(this.categoryId, 'category');
  //   if (this.isValid) {
  //     this.lawService.postAdd(data).subscribe(() => {
  //       this.toast.success('Law created succesfully!');
  //       this.modalRef.hide();
  //       this.submited.emit();
  //     }, (error) => {
  //       this.toast.error(error.error.message);
  //     });
  //   }
  // }

  update() {
    this.isValid = true;
    const dataToUpdate = {
      id: this.itemId,
      title: this.title,
      code: this.code !== null || this.code.length !== 0 ? this.code.trim() : '',
      categoryId: this.categoryId,
      subcategoryTitles: this.sectionList
    };
    this.validateStringData(this.title, 'title');
    this.validateStringData(this.code, 'keyword');
    this.validateNullOrUndifinedData(this.categoryId, 'category');
    if (this.isValid) {
      this.lawService.update(dataToUpdate).subscribe(() => {
        this.toast.success('Law updated succesfully!');
        this.modalRef.hide();
        this.submited.emit();
      }, (error) => {
        this.toast.error(error.error.message);
      });
    }
  }

  validateStringData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  validateNullOrUndifinedData(attr, id: string) {
    if (attr == null || attr === undefined) {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  addInput() {
    this.inputsArray.push({});
  }

  removeInput(idx: number) {
    this.inputsArray.splice(idx, 1);
    this.sectionList.splice(idx, 1);
  }

  defaultValues() {
    this.title = '';
    this.code = '';
    this.categoryId = null;
    this.inputsArray = new Array(1);
    this.sectionList = new Array();
  }
}
