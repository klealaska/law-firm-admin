import { BlogPostApprovalModule } from './../blog-post-approval/blog-post-approval.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AddEditBlogPostModule } from './../../add-edit-modals/add-edit-blog-post/add-edit-blog-post.module';
import { ComponentsModule } from './../../components/components.module';
import { TableComponent } from './../../components/table/table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from './blog-post.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { ApproveModalComponent } from '../../components/approve-modal/approve-modal.component';
import { ChangeStatusModalComponent } from '../../components/change-status-modal/change-status-modal.component';

const routes: Routes = [
  {
    path: '',
    component: BlogPostComponent
  }
];

@NgModule({
  declarations: [BlogPostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxSpinnerModule,
    ComponentsModule,
    Ng2SearchPipeModule,
    AddEditBlogPostModule,
    TabsModule.forRoot(),
    BlogPostApprovalModule
  ],
  entryComponents: [
    TableComponent,
    DeleteModalComponent,
    ApproveModalComponent,
    ChangeStatusModalComponent
  ]
})
export class BlogPostModule { }
