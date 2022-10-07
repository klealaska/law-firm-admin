import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGroupsComponent } from './user-groups.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ComponentsModule } from '../../components/components.module';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { AddEditUserGroupsModule } from '../../add-edit-modals/add-edit-user-groups/add-edit-user-groups.module';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: UserGroupsComponent
  }
];

@NgModule({
  declarations: [UserGroupsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
    AddEditUserGroupsModule,
    NgxSpinnerModule
  ],
  entryComponents: [DeleteModalComponent]
})
export class UserGroupsModule { }
