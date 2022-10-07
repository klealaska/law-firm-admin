import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CkEditorService } from '../../services/ck-editor/ck-editor.service';
import { LawArticleHistoryService } from '../../services/law-article-history/law-article-history.service';

@Component({
  selector: 'app-add-edit-law-article-history',
  templateUrl: './add-edit-law-article-history.component.html',
  styleUrls: ['./add-edit-law-article-history.component.scss']
})
export class AddEditLawArticleHistoryComponent implements OnInit {

  // editor section
  public Editor;
  public editorConfig;

  public itemId;
  public title = '';
  public code = '';
  public order;
  public content = '';
  public isOverview: boolean = false;
  public language;
  pageType: any;

  @ViewChild('template', { static: false }) template: TemplateRef<any>;

  public modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-xl'
  };

  constructor(
    private lawArticleHistoryService: LawArticleHistoryService,
    private modalService: BsModalService,
    private ckEditorService: CkEditorService,
  ) {
    this.Editor = this.ckEditorService.Editor;
    this.editorConfig = this.ckEditorService.editorConfig;
  }

  ngOnInit() {
  }

  openModal() {
    this.defaultValues();
    this.modalRef = this.modalService.show(this.template, this.config);
    if (this.pageType === 'fullContent') {
      this.getDataById();
    }
  }

  getDataById() {
    this.lawArticleHistoryService.getLawArticleHistoryById(this.itemId).subscribe((res: any) => {
      this.title = res.title;
      this.code = res.code;
      this.order = res.order;
      this.content = res.content;
      this.isOverview = res.isOverview;
    });
  }

  defaultValues() {
    this.title = '';
    this.code = '';
    this.order = '';
    this.content = '';
    this.isOverview = false;
  }

}
