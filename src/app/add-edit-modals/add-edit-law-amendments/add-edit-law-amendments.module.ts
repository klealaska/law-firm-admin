import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddEditLawAmendmentsComponent } from './add-edit-law-amendments.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal/';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AddEditLawAmendmentsComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    CKEditorModule
  ],
  exports: [AddEditLawAmendmentsComponent]
})
export class AddEditLawAmendmentsModule { }
