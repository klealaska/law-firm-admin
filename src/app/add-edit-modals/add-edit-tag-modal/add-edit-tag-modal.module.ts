import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditTagModalComponent } from './add-edit-tag-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AddEditTagModalComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    NgxSpinnerModule
  ],
  exports: [AddEditTagModalComponent]

})
export class AddEditTagModalModule { }
