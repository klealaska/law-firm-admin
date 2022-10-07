import { ApproveEditLawViewModule } from './../approve-edit-law-view/approve-edit-law-view.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DeleteModalComponent } from './../../components/delete-modal/delete-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawApprovalComponent } from './law-approval.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { PublishModalComponent } from '../../components/publish-modal/publish-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  {
    path: '',
    component: LawApprovalComponent
  }
];

@NgModule({
  declarations: [LawApprovalComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    NgSelectModule,
    Ng2SearchPipeModule,
    TabsModule.forRoot()
  ],
  entryComponents: [DeleteModalComponent, PublishModalComponent]
})
export class LawApprovalModule { }
