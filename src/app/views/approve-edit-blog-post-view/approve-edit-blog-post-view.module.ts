import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveEditBlogPostViewComponent } from './approve-edit-blog-post-view.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule, TooltipModule } from 'primeng/primeng';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ApproveEditBlogPostViewComponent
  }
];

@NgModule({
  declarations: [ApproveEditBlogPostViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(routes),
    NgSelectModule,
    FileUploadModule,
    TooltipModule,
    CKEditorModule
  ]
})
export class ApproveEditBlogPostViewModule { }
