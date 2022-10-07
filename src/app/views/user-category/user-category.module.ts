import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCategoryComponent } from './user-category.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddEditUserCategoryModule } from '../../add-edit-modals/add-edit-user-category/add-edit-user-category.module';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: UserCategoryComponent
  }
];

@NgModule({
  declarations: [UserCategoryComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
    AddEditUserCategoryModule,
    NgxSpinnerModule
  ],
  entryComponents: [DeleteModalComponent]
})
export class UserCategoryModule { }
