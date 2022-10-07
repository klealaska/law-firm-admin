import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditHyperlinksComponent } from './add-edit-hyperlinks.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [AddEditHyperlinksComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ModalModule.forRoot(),
  ],
  exports: [AddEditHyperlinksComponent]
})
export class AddEditHyperlinksModule { }
