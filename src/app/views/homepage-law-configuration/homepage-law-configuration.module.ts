import { NgxSpinnerModule } from 'ngx-spinner';
import { AddEditHomepageVideoModule } from './../../add-edit-modals/add-edit-homepage-video/add-edit-homepage-video.module';
import { ComponentsModule } from './../../components/components.module';
import { AddEditHomepageLawConfigModule } from './../../add-edit-modals/add-edit-homepage-law-config/add-edit-homepage-law-config.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageLawConfigurationComponent } from './homepage-law-configuration.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  {
    path: '',
    component: HomepageLawConfigurationComponent
  }
];

@NgModule({
  declarations: [HomepageLawConfigurationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    AddEditHomepageLawConfigModule,
    ComponentsModule,
    Ng2SearchPipeModule,
    TabsModule.forRoot(),
    AddEditHomepageVideoModule,
    NgxSpinnerModule,
  ],
  entryComponents: [DeleteModalComponent]
})
export class HomepageLawConfigurationModule { }
