import { TooltipModule } from 'primeng/tooltip';
import { AddEditLawRelatedLinksModule } from './../../add-edit-modals/add-edit-law-related-links/add-edit-law-related-links.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawArticleRelatedLinksComponent } from './law-article-related-links.component';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AccordionModule } from 'primeng/accordion';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';


const routes: Routes = [
  {
    path: '',
    component: LawArticleRelatedLinksComponent
  }
];

@NgModule({
  declarations: [LawArticleRelatedLinksComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    AddEditLawRelatedLinksModule,
    AccordionModule,
    TooltipModule,
    Ng2SearchPipeModule,
    NgSelectModule,
  ],
  entryComponents: [DeleteModalComponent]
})
export class LawArticleRelatedLinksModule { }
