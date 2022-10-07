import { NgxSpinnerService } from 'ngx-spinner';
import { HomepageVideoService } from './../../services/homepage-video/homepage-video.service';
import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-homepage-video',
  templateUrl: './add-edit-homepage-video.component.html',
  styleUrls: ['./add-edit-homepage-video.component.scss']
})
export class AddEditHomepageVideoComponent implements OnInit {

  public title = '';
  public name;
  public link = '';
  public isVisible: boolean = true;
  public itemId;
  isValid: boolean;
  pageType: any;
  isSubmitted: boolean = false;

  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @Output() public submited: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered'
  };

  constructor(
    private toast: ToastrService,
    private modalService: BsModalService,
    private videoService: HomepageVideoService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  openModal() {
    this.defaultValues();
    this.modalRef = this.modalService.show(this.template, this.config);
    if (this.pageType === 'edit') {
      this.getDataById();
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.pageType === 'edit') {
      this.update();
    } else if (this.pageType === 'add') {
      this.add();
    }
  }

  getDataById() {
    this.spinner.show();
    this.videoService.getById(this.itemId).subscribe((res: any) => {
      this.title = res.title;
      this.link = res.link;
      this.isVisible = res.isVisible;
      this.spinner.hide();
    }, () => {
      this.toast.error('Error!Something went wrong.');
      this.modalRef.hide();
      this.spinner.hide();
    });
  }

  add() {
    this.isValid = true;
    const data = {
      title: this.title,
      link: this.link,
      isVisible: this.isVisible
    };
    this.validateStringData(this.title, 'title');
    this.validateStringData(this.link, 'link');
    if (this.isValid) {
      this.videoService.postAdd(data).subscribe(() => {
        this.toast.success('Video added successfully!');
        this.modalRef.hide();
        this.submited.emit();
      }, () => {
        this.toast.error('Error! Something went wrong, try again later.');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
  }

  update() {
    this.isValid = true;
    const dataToUpdate = {
      id: this.itemId,
      title: this.title,
      link: this.link,
      isVisible: this.isVisible
    };
    this.validateStringData(this.title, 'title');
    this.validateStringData(this.link, 'link');
    if (this.isValid) {
      this.videoService.update(dataToUpdate).subscribe(() => {
        this.toast.success('Video updated successfully!');
        this.modalRef.hide();
        this.submited.emit();
      }, () => {
        this.toast.error('Error! Something went wrong, try again later.');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
  }

  defaultValues() {
    this.isSubmitted = false;
    this.title = '';
    this.name = null;
    this.link = '';
    this.isVisible = true;
  }

  switchEvent(event) {
    this.isVisible = event.target.checked;
  }

  validateStringData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }
}
