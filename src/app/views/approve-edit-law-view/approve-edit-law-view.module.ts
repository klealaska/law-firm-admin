import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveEditLawViewComponent } from './approve-edit-law-view.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Routes, RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

const routes: Routes = [
  {
    path: '',
    component: ApproveEditLawViewComponent
  }
];

@NgModule({
  declarations: [ApproveEditLawViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    CKEditorModule,
    RouterModule.forChild(routes),
    ScrollingModule,
  ]
})
export class ApproveEditLawViewModule { }
