import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditTaxNewsModalComponent } from './add-edit-tax-news-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FileUploadModule } from 'primeng/primeng';

@NgModule({
  declarations: [AddEditTaxNewsModalComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [AddEditTaxNewsModalComponent]

})
export class AddEditTaxNewsModalModule { }
