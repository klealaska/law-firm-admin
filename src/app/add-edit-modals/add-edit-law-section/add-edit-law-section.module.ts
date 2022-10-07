import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditLawSectionComponent } from './add-edit-law-section.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [AddEditLawSectionComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    CKEditorModule
  ],
  exports: [AddEditLawSectionComponent]
})
export class AddEditLawSectionModule { }
