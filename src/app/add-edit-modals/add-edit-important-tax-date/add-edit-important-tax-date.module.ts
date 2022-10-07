import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditImportantTaxDateComponent } from './add-edit-important-tax-date.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal/';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker/';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [AddEditImportantTaxDateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    AccordionModule
  ],
  exports: [AddEditImportantTaxDateComponent]
})
export class AddEditImportantTaxDateModule { }
