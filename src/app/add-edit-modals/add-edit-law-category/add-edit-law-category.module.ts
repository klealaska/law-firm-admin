import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditLawCategoryComponent } from './add-edit-law-category.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
  declarations: [AddEditLawCategoryComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ModalModule.forRoot(),
    RadioButtonModule
  ],
  exports: [AddEditLawCategoryComponent]
})
export class AddEditLawCategoryModule { }
