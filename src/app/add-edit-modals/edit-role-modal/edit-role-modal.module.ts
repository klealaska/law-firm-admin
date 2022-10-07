import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditRoleModalComponent } from './edit-role-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [EditRoleModalComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    NgxSpinnerModule
  ],
  exports: [EditRoleModalComponent]
})
export class EditRoleModalModule { }
