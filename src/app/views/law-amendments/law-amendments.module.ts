import { AddEditLawAmendmentsModule } from './../../add-edit-modals/add-edit-law-amendments/add-edit-law-amendments.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawAmendmentsComponent } from './law-amendments.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { ApproveModalComponent } from '../../components/approve-modal/approve-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// const routes: Routes = [
//   {
//     path: '',
//     component: LawAmendmentsComponent
//   }
// ];

@NgModule({
  declarations: [LawAmendmentsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    // RouterModule.forChild(routes),
    NgxSpinnerModule,
    NgSelectModule,
    Ng2SearchPipeModule,
    AddEditLawAmendmentsModule
  ],
  entryComponents:
    [DeleteModalComponent,
      ApproveModalComponent
    ],
  exports: [LawAmendmentsComponent]
})
export class LawAmendmentsModule { }
