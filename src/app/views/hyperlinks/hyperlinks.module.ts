import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HyperlinksComponent } from './hyperlinks.component';
import { CanDeactivateGuard } from '../../services/can-deactivate-guard/can-deactivate-guard.guard';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddEditHyperlinksComponent } from '../../add-edit-modals/add-edit-hyperlinks/add-edit-hyperlinks.component';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { AddEditHyperlinksModule } from '../../add-edit-modals/add-edit-hyperlinks/add-edit-hyperlinks.module';


const routes: Routes = [
  {
    path: '',
    component: HyperlinksComponent
  }
];

@NgModule({
  declarations: [HyperlinksComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    AddEditHyperlinksModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    TabsModule.forRoot()
  ],
  entryComponents: [AddEditHyperlinksComponent, DeleteModalComponent]
})
export class HyperlinksModule { }
