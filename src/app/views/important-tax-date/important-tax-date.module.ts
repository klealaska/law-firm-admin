import { TabsModule } from 'ngx-bootstrap/tabs';
import { AddEditImportantTaxDateComponent } from './../../add-edit-modals/add-edit-important-tax-date/add-edit-important-tax-date.component';
import { AddEditImportantTaxDateModule } from './../../add-edit-modals/add-edit-important-tax-date/add-edit-important-tax-date.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportantTaxDateComponent } from './important-tax-date.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  {
    path: '',
    component: ImportantTaxDateComponent
  }
];

@NgModule({
  declarations: [ImportantTaxDateComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    AddEditImportantTaxDateModule,
    TabsModule.forRoot()
  ],
  entryComponents: [DeleteModalComponent]
})
export class ImportantTaxDateModule { }
