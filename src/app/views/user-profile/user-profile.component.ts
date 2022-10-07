import { NgxSpinnerService } from 'ngx-spinner';
import { UserImageService } from '../../services/user-image/user-image.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from './../../Interfaces/i-user';
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  itemId;
  isCollapsed: boolean = true;
  public firstName = '';
  public lastName = '';
  public email = '';
  public userRoleIds;
  public roles: any;
  public password = '';
  public oldPassword = '';
  public confirmPass = '';

  @ViewChild('fileInput', { static: false }) el: ElementRef;

  editFile: boolean = true;
  removeUpload: boolean = false;
  imagePath;
  file: [null];
  isValid = true;

  constructor(
    private userService: UserService,
    private toast: ToastrService,
    private cd: ChangeDetectorRef,
    private userImageService: UserImageService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getData();
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  getData() {
    this.spinner.show();
    this.userService.getProfile().subscribe((res: IUser) => {
      this.firstName = res.firstName;
      this.lastName = res.lastName;
      this.email = res.email;
      this.userRoleIds = res.userRoleIds;
      this.roles = res.roles;
      this.itemId = res.id;
      if (res.imagePath != null) {
        this.imagePath = res.imagePath.split('\\').join('/');
      } // else {
      //   this.imagePath = `/assets/img/avatar.png`;
      // }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    });
  }

  uploadFile(event) {
    const reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file
      reader.onload = () => {
        this.imagePath = reader.result;
        file = reader.result;
        this.editFile = false;
        this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    const newFileList = Array.from(this.el.nativeElement.files);
    this.imagePath = '';
    this.editFile = true;
    this.removeUpload = false;
    this.file = [null];
  }

  onEditprofile() {
    this.isValid = true;
    const dataToUpdate = {
      id: this.itemId,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      userRoleIds: this.userRoleIds,
      password: this.password,
      // imageContent: this.imagePath.split(',')[1]
    };
    this.validateNgSelect(this.userRoleIds);
    if (this.isValid) {
      this.spinner.show();
      this.userService.update(dataToUpdate).subscribe(() => {
        this.toast.success('Updated successfully!');
        this.password = '';
        // this.imagePath = null;
        this.confirmPass = '';
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        this.toast.warning('Error! Cannot edit, try again later.');
      });
    }
  }

  uploadImage() {
    const dataToUpdate = {
      id: this.itemId,
      imageContent: this.imagePath.split(',')[1]
    };
    this.userService.updateUserProfileImage(dataToUpdate).subscribe(() => {
      this.userImageService.sendNotification(this.imagePath);
      this.toast.success('Profile image updated successfully');
    }, () => {
      this.toast.error('Something went wrong, try again later');
    });
  }


  removeImage() {
    const dataToUpdate = {
      id: this.itemId,
      imageContent: null
    };
    this.userService.updateUserProfileImage(dataToUpdate).subscribe(() => {
      this.imagePath = null;
      this.userImageService.sendNotification(this.imagePath);
      this.toast.success('Profile image removed successfully');
    }, () => {
      this.toast.error('Something went wrong, try again later');
    });
  }

  resetPassword() {
    this.isValid = true;
    const data = {
      email: this.email,
      oldPassword: this.oldPassword,
      newPassword: this.password
    };
    this.validatePassword(this.password);
    this.validateData(this.oldPassword, 'old password');
    this.validateData(this.confirmPass, 'Confirm Password');
    if (this.confirmPass.length > 0 && this.confirmPass !== this.password) {
      this.isValid = false;
      this.toast.warning('Passwords don\'t match!');
    }
    if (this.isValid) {
      this.userService.resetPassword(data).subscribe((res: any) => {
        this.toast.success('Password updated succesfully!');
        this.oldPassword = '';
        this.password = '';
        this.confirmPass = '';
        this.toggleCollapse();
      }, (error) => {
        this.toast.error('Something went wrong, please try again.');
      });
    }
  }

  validatePassword(password) {
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    const valid = regex.test(password);
    if (!valid) {
      this.isValid = false;
      this.toast.warning('Password must have 8 alphanumeric characters, such as: "A,a,@,1"');
    }
  }

  validateNgSelect(attr) {
    if (attr.length === 0) {
      this.isValid = false;
      this.toast.warning(`Please fill out role field!`);
    }
  }

  validateData(attr, id: string) {
    if (attr === '') {
      this.isValid = false;
      this.toast.warning(`Please fill out ${id} field!`);
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onEditprofile();
    }
  }
}
