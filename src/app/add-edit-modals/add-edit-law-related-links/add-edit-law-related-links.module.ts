import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditLawRelatedLinksComponent } from './add-edit-law-related-links.component';
import { ModalModule } from 'ngx-bootstrap/modal/';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [AddEditLawRelatedLinksComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    NgSelectModule
  ],
  exports: [AddEditLawRelatedLinksComponent]
})
export class AddEditLawRelatedLinksModule { }
