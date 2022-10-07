import { AddEditBlogPostModule } from './../../add-edit-modals/add-edit-blog-post/add-edit-blog-post.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishBlogPostComponent } from './publish-blog-post.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TabsModule } from 'ngx-bootstrap/tabs/';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { PublishModalComponent } from '../../components/publish-modal/publish-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  {
    path: '',
    component: PublishBlogPostComponent
  }
];

@NgModule({
  declarations: [PublishBlogPostComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    TabsModule.forRoot(),
    AddEditBlogPostModule
  ],
  entryComponents: [DeleteModalComponent, PublishModalComponent]
})
export class PublishBlogPostModule { }
