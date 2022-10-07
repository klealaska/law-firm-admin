import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditHomepageLawConfigComponent } from './add-edit-homepage-law-config.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'primeng/primeng';

@NgModule({
  declarations: [AddEditHomepageLawConfigComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    FileUploadModule,
    ModalModule.forRoot(),
    NgxSpinnerModule
  ],
  exports: [AddEditHomepageLawConfigComponent]
})
export class AddEditHomepageLawConfigModule { }
