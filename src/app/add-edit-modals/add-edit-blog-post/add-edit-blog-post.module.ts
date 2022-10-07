import { CKEditorModule, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { TooltipModule } from 'primeng/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditBlogPostComponent } from './add-edit-blog-post.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [AddEditBlogPostComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    FileUploadModule,
    TooltipModule,
    CKEditorModule
  ],
  exports: [AddEditBlogPostComponent]
})
export class AddEditBlogPostModule { }
