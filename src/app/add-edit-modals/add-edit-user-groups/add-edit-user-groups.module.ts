import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditUserGroupsComponent } from './add-edit-user-groups.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AddEditUserGroupsComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    NgxSpinnerModule
  ],
  exports: [AddEditUserGroupsComponent]
})
export class AddEditUserGroupsModule { }
