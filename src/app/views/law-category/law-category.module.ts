import { TooltipModule } from 'primeng/primeng';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddEditLawCategoryModule } from '../../add-edit-modals/add-edit-law-category/add-edit-law-category.module';
import { AddEditLawCategoryComponent } from '../../add-edit-modals/add-edit-law-category/add-edit-law-category.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawCategoryComponent } from './law-category.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';



const routes: Routes = [
  {
    path: '',
    component: LawCategoryComponent
  }
];

@NgModule({
  declarations: [LawCategoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes),
    AddEditLawCategoryModule,
    TabsModule.forRoot(),
    NgxSpinnerModule,
    NgSelectModule,
    TooltipModule
  ],
  entryComponents: [AddEditLawCategoryComponent, DeleteModalComponent]
})
export class LawCategoryModule { }
