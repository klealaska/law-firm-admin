import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../../services/user-role/role.service';
import { ToastrService } from 'ngx-toastr';
import { AddEditTagModalComponent } from '../../add-edit-modals/add-edit-tag-modal/add-edit-tag-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  public filterQuery;
  public data;

  @ViewChild('editElement', { static: true }) editElement: AddEditTagModalComponent;

  columns = [
    { title: 'Role', name: 'name' },
    // { title: 'Actions', property: 'actions', class: 'text-center' },
  ];

  constructor(
    private roleService: RoleService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.roleService.getAll().subscribe((res: any) => {
      this.data = res;
      this.spinner.hide();
    }, error => {
      this.toast.error('Error! Something went wrong.');
      this.spinner.hide();
    });
  }

  editItem(id) {
    this.editElement.itemId = id;
    this.editElement.openModal();
  }

  onActionClick(event: any) {
    switch (event.action) {
      case 'edit':
        this.editItem(event.id);
        break;
      default:
        break;
    }
  }

  refreshGrid() {
    this.getData();
  }
}
