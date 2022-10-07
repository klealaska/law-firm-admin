import { PermissionsService } from './../../services/permissions/permissions.service';
import { UserRoleEnum } from './../../enums/userRoleEnum';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { storageLabelsEnum } from '../../enums/storageLabelsEnum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  userRoles = new Array();

  constructor(private userService: UserService,
    private storageService: StorageService,
    private route: Router,
    private toast: ToastrService,
    private permissionsService: PermissionsService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    const data = {
      email: this.email,
      password: this.password
    };
    this.validateData(data.email, 'email');
    this.validateData(data.password, 'password');
    if (data.password.length > 0 || data.email.length > 0) {
      this.userService.postLogin(data).subscribe((res: any) => {
        let isValid = false;
        res.userResponse.roles.forEach(role => {
          this.userRoles.push(role.name);
          switch (this.userService.userSystemRoles.includes(role.name)) {
            case true: {
              if (res.token === '') {
                this.toast.error('Unauthorized!');
              }
              this.storageService.setAuthToken(res.token);
              this.storageService.setStorage(storageLabelsEnum.UserRoles, JSON.stringify(this.userRoles));
              this.permissionsService.getSidebarItems();
              isValid = true;
              break;
            }
            case false: {
              this.toast.warning('You don\'t have permission to login!');
              break;
            }
            default:
              break;
          }
        });
        if (isValid) {
          // this.toast.success('Login successful!');
          this.route.navigate(['']);
        }
      }, error => {
        if (error.status === 403) {
          this.toast.error('You cannot login! Please verify your account first!');
        } else if (error.status === 400) {
          this.toast.error(error.error.message);
        } else {
          this.toast.error('Something went wrong! Try again later!');
        }
      });
    } else {
      this.toast.error('Not valid! Please fill out the fields!');
    }
  }

  validateData(attr, id: string) {
    if (attr === '') {
      const validate = document.getElementById(id);
      validate.className = 'form-control is-invalid';
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onLogin();
    }
  }
}
