import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditLawsComponent } from './add-edit-laws.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [AddEditLawsComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    NgSelectModule,
  ],
  exports: [AddEditLawsComponent]
})
export class AddEditLawsModule { }
