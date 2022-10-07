import { EditorAdapterComponent } from './editor-adapter/editor-adapter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LightboxModule } from 'ngx-lightbox';
import { ApproveModalComponent } from './approve-modal/approve-modal.component';
import { PublishModalComponent } from './publish-modal/publish-modal.component';
import { TooltipModule } from 'primeng/tooltip';
import { SendToMyAmendmentsComponent } from './send-to-my-amendments/send-to-my-amendments.component';
import { ChangeStatusModalComponent } from './change-status-modal/change-status-modal.component';

@NgModule({
  declarations: [
    TableComponent,
    DeleteModalComponent,
    EditorAdapterComponent,
    PublishModalComponent,
    SendToMyAmendmentsComponent,
    ChangeStatusModalComponent,
    ApproveModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    LightboxModule,
    TooltipModule
  ],
  exports: [TableComponent,
    DeleteModalComponent,
    EditorAdapterComponent,
    ApproveModalComponent,
    PublishModalComponent,
    SendToMyAmendmentsComponent,
    ChangeStatusModalComponent]
})
export class ComponentsModule { }
