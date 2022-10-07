import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditHomepageVideoComponent } from './add-edit-homepage-video.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal/';


@NgModule({
  declarations: [AddEditHomepageVideoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    NgxSpinnerModule
  ],
  exports: [AddEditHomepageVideoComponent]
})
export class AddEditHomepageVideoModule { }
