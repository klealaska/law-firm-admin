import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditLawVersionComponent } from './add-edit-law-version.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [AddEditLawVersionComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule
  ],
  exports: [AddEditLawVersionComponent]
})
export class AddEditLawVersionModule {

}
