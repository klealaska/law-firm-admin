import { SendToMyAmendmentsComponent } from './../../components/send-to-my-amendments/send-to-my-amendments.component';
import { LawAmendmentsComponent } from './../law-amendments/law-amendments.component';
import { LawAmendmentsModule } from './../law-amendments/law-amendments.module';
import { DeleteModalComponent } from './../../components/delete-modal/delete-modal.component';
import { AddEditLawsModule } from './../../add-edit-modals/add-edit-laws/add-edit-laws.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawsComponent } from './laws.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccordionModule } from 'primeng/accordion';
import { AddEditLawSectionModule } from '../../add-edit-modals/add-edit-law-section/add-edit-law-section.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CanDeactivateGuard } from '../../services/can-deactivate-guard/can-deactivate-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: LawsComponent,
    // canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  declarations: [LawsComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    NgSelectModule,
    AddEditLawsModule,
    AccordionModule,
    AddEditLawSectionModule,
    TabsModule.forRoot(),
    LawAmendmentsModule
  ],
  entryComponents: [DeleteModalComponent, SendToMyAmendmentsComponent]
})
export class LawsModule { }
