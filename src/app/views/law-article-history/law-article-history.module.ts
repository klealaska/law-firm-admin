import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddEditLawArticleHistoryModule } from '../../add-edit-modals/add-edit-law-article-history/add-edit-law-article-history.module';
import { ComponentsModule } from '../../components/components.module';
import { LawArticleHistoryComponent } from './law-article-history.component';


const routes: Routes = [
  {
    path: '',
    component: LawArticleHistoryComponent
  }
];

@NgModule({
  declarations: [LawArticleHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    NgSelectModule,
    Ng2SearchPipeModule,
    TabsModule.forRoot(),
    AddEditLawArticleHistoryModule
  ]
})

export class LawArticleHistoryModule { }
