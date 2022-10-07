import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { AddEditUserModalModule } from '../../add-edit-modals/add-edit-user-modal/add-edit-user-modal.module';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';


const routes: Routes = [
  {
    path: '',
    component: UserComponent
  }
];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes),
    AddEditUserModalModule,
    TabsModule.forRoot(),
    NgxSpinnerModule,
    NgSelectModule
  ],
  entryComponents: [DeleteModalComponent]
})
export class UserModule { }
