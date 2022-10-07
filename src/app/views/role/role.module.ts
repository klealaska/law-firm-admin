import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { EditRoleModalModule } from '../../add-edit-modals/edit-role-modal/edit-role-modal.module';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent
  }
];

@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    Ng2SearchPipeModule,
    ComponentsModule,
    EditRoleModalModule,
    NgxSpinnerModule
  ]
})
export class RoleModule { }
