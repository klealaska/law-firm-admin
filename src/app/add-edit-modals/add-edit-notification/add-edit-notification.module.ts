import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditNotificationComponent } from './add-edit-notification.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AddEditNotificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgSelectModule
  ],
  exports: [AddEditNotificationComponent]

})
export class AddEditNotificationModule { }
