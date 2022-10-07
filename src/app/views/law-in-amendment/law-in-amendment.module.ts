import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawInAmendmentComponent } from './law-in-amendment.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LawInAmendmentComponent
  }
];

@NgModule({
  declarations: [LawInAmendmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    NgSelectModule,
    CKEditorModule
  ]
})
export class LawInAmendmentModule { }
