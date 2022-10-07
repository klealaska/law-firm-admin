import { NgxSpinnerModule } from 'ngx-spinner';
import { AddEditNotificationModule } from './../../add-edit-modals/add-edit-notification/add-edit-notification.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  {
    path: '',
    component: NotificationComponent
  }
];

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    AddEditNotificationModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule
  ],
  entryComponents: [DeleteModalComponent]
})
export class NotificationModule { }
