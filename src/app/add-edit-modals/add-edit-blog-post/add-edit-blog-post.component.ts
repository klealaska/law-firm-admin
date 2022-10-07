import { CkEditorService } from './../../services/ck-editor/ck-editor.service';
import { UserGroupsService } from './../../services/user-groups/user-groups.service';
import { TagService } from './../../services/tag/tag.service';
import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, TemplateRef, ElementRef, Output, EventEmitter } from '@angular/core';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileUpload } from 'primeng/primeng';
import { BlogPostApprovalService } from '../../services/blog-post-approval/blog-post-approval.service';

@Component({
  selector: 'app-add-edit-blog-post',
  templateUrl: './add-edit-blog-post.component.html',
  styleUrls: ['./add-edit-blog-post.component.scss']
})
export class AddEditBlogPostComponent implements OnInit {

  // editor section
  public Editor;
  public editorConfig;

  public itemId;
  public title = '';
  public description = '';
  public publishedDate = new Date();
  public userGroupId;
  public tagList = new Array<any>();
  public userGroupList = new Array<any>();
  public tagIds = new Array<any>();

  contents: any = null;
  filename: string;

  tagListIds = new Array<any>();
  inputsArray = new Array(1);
  authorNames = new Array();
  authorLinks = new Array();

  public authors: any = [{
    index: 0,
    authorName: [],
    authorBioLink: []
  }];

  imagePath;
  imageType;
  pageType: any;
  lawType;
  file: [null];
  editFile: boolean = true;
  removeUpload: boolean = false;
  filesPdf = new Array<any>();
  existingPdfs = new Array<any>();
  fileTypes = new Array();
  isValid: boolean;
  isSubmitted: boolean = false;

  uploadedFiles: any[] = [];
  uploadedPdfs: any[] = [];
  showCancelButton: boolean;
  showUploadButton: boolean;
  showCancel: boolean;
  showUpload: boolean;

  // modal cofig section
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-xl'
  };

  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @ViewChild('fileInput', { static: false }) el: ElementRef;
  @ViewChild('fileInput', { static: false }) fileInput: FileUpload;
  @Output() public submited: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private blogPostService: BlogPostService,
    private blogPostApprovalService: BlogPostApprovalService,
    private tagService: TagService,
    private spinner: NgxSpinnerService,
    private cd: ChangeDetectorRef,
    private userGroupsService: UserGroupsService,
    private ckEditorService: CkEditorService
  ) {
    this.Editor = this.ckEditorService.Editor;
    this.editorConfig = this.ckEditorService.editorConfig;
  }

  ngOnInit() {
    if (this.pageType === 'edit') {
      this.modalService.onShow.subscribe(() => {
        this.getBlogPostApprovalById();
      });
    }
    this.getTags();
    this.getUserGroups();
  }

  openModal() {
    this.defaultValues();
    this.getTags();
    this.modalRef = this.modalService.show(this.template, this.config);
    if (this.pageType === 'edit') {
      this.getBlogPostApprovalById();
    }
    if (this.pageType === 'fullContent') {
      this.getBlogPostById();
    }
  }

  onChange() {
    this.showUploadButton = true;
    this.showCancelButton = true;
  }

  onChangeImage() {
    this.showUpload = true;
    this.showCancel = true;
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    const reader = new FileReader(); // HTML5 FileReader API
    let file = this.uploadedFiles[0];
    this.imageType = event.files[0].type;
    if (event.files && event.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file
      reader.onload = () => {
        this.imagePath = reader.result;
        file = reader.result;
        this.editFile = false;
        this.removeUpload = true;
      };
      this.cd.markForCheck();
    }
  }

  onUploadPdfs(event) {
    this.fileTypes = new Array();
    for (let file of event.files) {
      this.uploadedPdfs.push(file);
    }
    for (let index = 0; index < this.uploadedPdfs.length; index++) {
      const reader = new FileReader();
      this.fileTypes.push(this.uploadedPdfs[index].type);
      let file = this.uploadedPdfs[index];
      if (this.uploadedPdfs[index]) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.filesPdf.push(reader.result);
          file = reader.result;
          this.removeUpload = true;
        };
      }
    }
  }

  getBlogPostById() {
    this.blogPostService.getById(this.itemId).subscribe((res: any) => {
      this.title = res.title;
      this.userGroupId = (res.userGroupId !== 0 && res.userGroupId != null) ? res.userGroupId : null;
      this.publishedDate = new Date(res.publishedDate);
      this.description = res.description;
      this.tagIds = this.tagListIds;
      this.imagePath = res.imageUrl;
      res.attachmentUrls.forEach(attch => {
        if (attch !== null) {
          this.existingPdfs.push(attch);
        }
      });
      if (res.blogPostTags.length !== 0) {
        res.blogPostTags.forEach(tag => {
          this.tagListIds.push(tag.tagId);
        });
      }
      if (res.authors.length !== 0) {
        let counter = 0;
        res.authors.forEach(a => {
          counter = counter + 1;
          this.authorNames.push(a.authorName);
          this.authorLinks.push(a.authorBioLink);
        });
        this.inputsArray = new Array(counter);
      }
    });
  }

  getBlogPostApprovalById() {
    this.blogPostApprovalService.getById(this.itemId).subscribe((res: any) => {
      this.title = res.title;
      this.userGroupId = (res.userGroupId !== 0 && res.userGroupId != null) ? res.userGroupId : null;
      this.publishedDate = new Date(res.publishedDate);
      this.description = res.description;
      this.tagIds = this.tagListIds;
      if (res.imageUrl != null) {
        this.imagePath = 'data:image/png;base64,' + res.imageUrl;
      }
      res.attachmentUrls.forEach(attch => {
        if (attch !== null) {
          this.existingPdfs.push(attch);
        }
      });
      if (res.blogPostTags.length !== 0) {
        res.blogPostTags.forEach(tag => {
          this.tagListIds.push(tag.tagId);
        });
      }
      if (res.authors.length !== 0) {
        let counter = 0;
        res.authors.forEach(a => {
          counter = counter + 1;
          this.authorNames.push(a.authorName);
          this.authorLinks.push(a.authorBioLink);
        });
        this.inputsArray = new Array(counter);
      }
    });
  }

  getTags() {
    this.tagService.getAll().subscribe((res: any) => {
      this.tagList = res.body;
    });
  }

  getUserGroups() {
    this.userGroupsService.getAll().subscribe((res: any) => {
      this.userGroupList = res.body;
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.pageType === 'edit') {
      this.update();
    } else if (this.pageType === 'add') {
      this.add();
    }
  }

  add() {
    this.isValid = true;
    this.bindAuthors();
    const data = {
      title: this.title,
      publishedDate: this.publishedDate,
      blogPostAuthors: this.authors,
      attachmentContents: this.filesPdf.length === 0 ? null : this.splitBase64(this.filesPdf),
      imageUrl: this.imagePath == null ? null : this.imagePath.split(',')[1],
      tagIds: this.tagIds,
      description: this.description,
      userGroupId: this.userGroupId
    };
    this.validateStringData(this.title, 'Title');
    this.validateStringData(this.description, 'Description');
    this.validateNullData(this.publishedDate, 'Publish Date');
    this.validateArray(this.authorNames, 'Author Name');
    if (this.imagePath != null) {
      this.validateImage(this.imageType);
    }
    if (this.fileTypes.length !== 0) {
      this.validatePdfFiles(this.fileTypes);
    }
    if (this.isValid) {
      this.blogPostApprovalService.postAdd(data).subscribe(() => {
        this.toast.success('Blog Post added successfully, send it for approval');
        this.modalRef.hide();
        this.authors = new Array();
        this.submited.emit();
        this.uploadedPdfs = [];
      }, () => {
        this.toast.error('Something went wrong, try again later.');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
  }

  update() {
    this.isValid = true;
    this.bindAuthors();
    const dataToUpdate = {
      id: this.itemId,
      title: this.title,
      publishedDate: this.publishedDate,
      tagIds: this.tagIds,
      description: this.description,
      blogPostAuthors: this.authors,
      imageUrl: this.imagePath == null ? null : this.imagePath.split(',')[1],
      attachmentContents: this.filesPdf.length === 0 ? null : this.splitBase64(this.filesPdf),
      existingFileUrls: this.existingPdfs,
      userGroupId: this.userGroupId
    };
    this.validateStringData(this.title, 'Title');
    this.validateNullData(this.publishedDate, 'Publish Date');
    this.validateNullData(this.publishedDate, 'Publish Date');
    this.validateArray(this.authorNames, 'Author Name');
    if (this.imageType.length !== 0) {
      this.validateImage(this.imageType);
    }
    if (this.fileTypes.length !== 0) {
      this.validatePdfFiles(this.fileTypes);
    }
    if (this.isValid) {
      this.blogPostApprovalService.update(dataToUpdate).subscribe(() => {
        this.toast.success('Blog Post updated successfully!');
        this.modalRef.hide();
        this.authors = new Array();
        this.submited.emit();
        this.uploadedPdfs = [];
      }, error => {
        this.toast.error('Something went wrong, try again later');
        this.modalRef.hide();
      });
    } else {
      this.isSubmitted = false;
    }
  }

  showPreviewPdf(filePath: string) {
    return `${filePath}`;
  }

  // Function to remove uploaded image
  removeUploadedImage() {
    this.imagePath = null;
    this.editFile = true;
    this.removeUpload = false;
    this.file = [null];
    this.uploadedFiles = [];
  }

  // Function to remove uploaded file
  removeUploadedPdfFile(fileName) {
    const index = this.existingPdfs.indexOf(fileName);
    this.existingPdfs.splice(index, 1);
    this.uploadedPdfs.splice(index, 1);
  }

  splitBase64(files) {
    const filesBase64 = new Array();
    files.forEach(f => {
      filesBase64.push(f.split(',')[1]);
    });
    return filesBase64;
  }

  validateArray(attr, id: string) {
    if (attr.length === 0) {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  validateStringData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  validateNullData(attr, id: string) {
    if (attr == null) {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  validateImage(fileType: string) {
    const regex = new RegExp(/([a-zA-Z0-9\s_\\.\-\(\):\/])+(.png|.jpe?g)$/i);
    const valid = regex.test(fileType);
    if (!valid) {
      this.isValid = false;
      this.toast.warning('Image is not valid!');
    }
  }

  validatePdfFiles(fileTypes: any) {
    fileTypes.forEach(type => {
      const regex = new RegExp(/([a-zA-Z0-9\s_\\.\-\(\):\/])+(.pdf)$/i);
      const valid = regex.test(type);
      if (!valid) {
        this.isValid = false;
        this.toast.warning('Pdf file is not valid!');
      }
    });
  }

  defaultValues() {
    this.isSubmitted = false;
    this.title = '';
    this.publishedDate = null;
    this.existingPdfs = new Array<any>();
    this.imagePath = null;
    this.userGroupId = null;
    this.tagListIds = new Array<any>();
    this.tagIds = new Array<any>();
    this.filesPdf = new Array<any>();
    this.description = '';
    this.authors = new Array();
    this.imageType = '';
    this.fileTypes = new Array();
    this.inputsArray = new Array(1);
    this.authorNames = new Array();
    this.authorLinks = new Array();
    this.uploadedPdfs = [];
    (this.uploadedPdfs.length == 0) ? this.showUploadButton = false : this.showUploadButton = true;
    (this.uploadedPdfs.length == 0) ? this.showCancelButton = false : this.showCancelButton = true;
    (this.uploadedFiles.length == 0) ? this.showUpload = false : this.showUpload = true;
    (this.uploadedFiles.length == 0) ? this.showCancel = false : this.showCancel = true;
  }

  addInput() {
    this.inputsArray.push({});
  }

  removeInput(idx: number) {
    this.inputsArray.splice(idx, 1);
    this.authorNames.splice(idx, 1);
    this.authorLinks.splice(idx, 1);
  }

  openNewWindow(path: string) {
    window.open(path);
  }

  bindAuthors() {
    for (let index = 0; index < this.authorNames.length; index++) {
      const name = this.authorNames[index];
      this.authors.push({
        authorName: name,
        authorBioLink: this.authorLinks[index]
      });
    }
  }
}
