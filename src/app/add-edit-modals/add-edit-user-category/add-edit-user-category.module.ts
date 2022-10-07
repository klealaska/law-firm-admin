import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditUserCategoryComponent } from './add-edit-user-category.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AddEditUserCategoryComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    NgxSpinnerModule
  ],
  exports: [AddEditUserCategoryComponent]
})
export class AddEditUserCategoryModule { }
