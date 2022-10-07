import { AddEditLawVersionModule } from '../../add-edit-modals/add-edit-law-version/add-edit-law-version.module';
import { AddEditLawVersionComponent } from '../../add-edit-modals/add-edit-law-version/add-edit-law-version.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawArticleVersionComponent } from './law-article-version.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AccordionModule, TooltipModule } from 'primeng/primeng';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';



const routes: Routes = [
  {
    path: '',
    component: LawArticleVersionComponent
  }
];
@NgModule({
  declarations: [LawArticleVersionComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forChild(routes),
    AddEditLawVersionModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    AccordionModule,
    TooltipModule,
    NgSelectModule,
    TabsModule.forRoot(),
  ],
  entryComponents: [AddEditLawVersionComponent, DeleteModalComponent]
})
export class LawArticleVersionModule { }
