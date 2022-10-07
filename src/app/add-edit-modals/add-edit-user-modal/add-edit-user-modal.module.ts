import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditUserModalComponent } from './add-edit-user-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AddEditUserModalComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    NgSelectModule,
    NgxSpinnerModule
  ],
  exports: [AddEditUserModalComponent]
})
export class AddEditUserModalModule { }
