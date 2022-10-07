import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostApprovalComponent } from './blog-post-approval.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from '../../components/components.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddEditBlogPostModule } from '../../add-edit-modals/add-edit-blog-post/add-edit-blog-post.module';
import { TableComponent } from '../../components/table/table.component';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { ApproveModalComponent } from '../../components/approve-modal/approve-modal.component';


@NgModule({
  declarations: [BlogPostApprovalComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    ComponentsModule,
    Ng2SearchPipeModule,
    AddEditBlogPostModule
  ],
  entryComponents: [TableComponent, DeleteModalComponent, ApproveModalComponent],
  exports: [BlogPostApprovalComponent]
})
export class BlogPostApprovalModule { }
