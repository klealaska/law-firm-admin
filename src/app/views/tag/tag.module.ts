import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ComponentsModule } from '../../components/components.module';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { AddEditTagModalModule } from '../../add-edit-modals/add-edit-tag-modal/add-edit-tag-modal.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: TagComponent
  }
];

@NgModule({
  declarations: [TagComponent],
  imports: [
    ComponentsModule,
    AddEditTagModalModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
    TabsModule.forRoot(),
    NgxSpinnerModule
  ],
  entryComponents: [DeleteModalComponent]
})
export class TagModule { }
