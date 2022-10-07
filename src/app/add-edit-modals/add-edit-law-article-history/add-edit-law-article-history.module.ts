import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddEditLawArticleHistoryComponent } from './add-edit-law-article-history.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [AddEditLawArticleHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    CKEditorModule
  ],
  exports: [AddEditLawArticleHistoryComponent]
})
export class AddEditLawArticleHistoryModule { }
