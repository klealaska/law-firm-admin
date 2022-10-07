import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxNewsComponent } from './tax-news.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { AddEditTaxNewsModalModule } from '../../add-edit-modals/add-edit-tax-news-modal/add-edit-tax-news-modal.module';

const routes: Routes = [
  {
    path: '',
    component: TaxNewsComponent
  }
];

@NgModule({
  declarations: [TaxNewsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes),
    AddEditTaxNewsModalModule,
    TabsModule.forRoot(),
    NgxSpinnerModule
  ],
  entryComponents: [DeleteModalComponent]
})

export class TaxNewsModule { }
