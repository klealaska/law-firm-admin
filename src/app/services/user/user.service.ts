import { FilterModel } from './../../Interfaces/FilterModel';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { StorageService } from '../storage/storage.service';
import { UserRoleEnum } from '../../enums/userRoleEnum';
import { Pagination } from '../../Interfaces/Pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private postLoginEndpoint = 'user/login/web';
  private postRegisterEndpoint = 'user/register/web';
  private getEndpoint = 'user/getAll';
  private getByIdEndpoint = 'user/getById';
  private getUserProfile = 'user/getProfile';
  private putUpdateEndpoint = 'user/update';
  private updateUserProfileImageEndpoint = 'user/UpdateUserProfileImage';
  private deleteEndpoint = 'user/delete';
  private resetPasswordEndpoint = 'user/resetPassword';
  private getSystemUsersEndpoint = 'user/GetSystemUsers';
  public userSystemRoles = [UserRoleEnum.Admin, UserRoleEnum.Approver, UserRoleEnum.Editor];

  constructor(private apiService: ApiService, private storageService: StorageService) { }

  postLogin(data) {
    return this.apiService.post(this.postLoginEndpoint, data);
  }

  postRegister(data) {
    return this.apiService.post(this.postRegisterEndpoint, data);
  }

  isLoggedIn() {
    return !!this.storageService.getAuthToken();
  }

  logOut() {
    return this.storageService.removeAuthToken();
  }

  getAllSystemUser(pagination?: Pagination) {
    let url = `${this.getEndpoint}?$filter=userRoles/any(a:a/role/name ne 'User')`;
    if (pagination != null) {
      url = `${url}&$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }
    return this.apiService.get(url);
  }

  searchSystemUser(filter: FilterModel, pagination?: Pagination) {
    let url = '';
    if (filter.Column === 'role') {
      url = `${this.getEndpoint}?$filter= userRoles/any(a:contains(a/role/name,'${filter.Property}'))`;
    } else {
      url = `${this.getEndpoint}?$filter=contains(${filter.Column},'${filter.Property}' )`;
    }
    return this.apiService.get(url);
  }

  getAllRegisteredUser(pagination?: Pagination) {
    let url = `${this.getEndpoint}?$filter=userRoles/any(a:a/role/name eq 'User')`;
    if (pagination != null) {
      url = `${url}&$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }
    return this.apiService.get(url);
  }

  getById(id) {
    return this.apiService.get(this.getByIdEndpoint + '/' + id);
  }

  getProfile() {
    return this.apiService.get(this.getUserProfile);
  }

  update(data) {
    return this.apiService.put(this.putUpdateEndpoint, data);
  }

  updateUserProfileImage(data) {
    return this.apiService.post(this.updateUserProfileImageEndpoint, data);
  }

  delete(id) {
    return this.apiService.delete(this.deleteEndpoint + '/' + id);
  }

  resetPassword(data) {
    return this.apiService.post(this.resetPasswordEndpoint, data);
  }

  getSystemUsers() {
    return this.apiService.get(this.getSystemUsersEndpoint);
  }
}
