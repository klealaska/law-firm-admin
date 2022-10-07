import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditLawSectionComponent } from './add-edit-law-section.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AddEditLawSectionComponent
  }
];

@NgModule({
  declarations: [AddEditLawSectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    CKEditorModule
  ]
})
export class AddEditLawSectionModule { }
