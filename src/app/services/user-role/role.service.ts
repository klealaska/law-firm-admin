import { Injectable } from '@angular/core';
import { Pagination } from '../../Interfaces/Pagination';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private postAddEndpoint = 'role/add';
  private getEndpoint = 'role/getAll';
  private getByIdEndpoint = 'role/getById';
  private putUpdateEndpoint = 'role/update';
  private deleteEndpoint = 'role/delete';

  constructor(private apiService: ApiService) { }

  getAll(pagination?: Pagination) {
    let url = this.getEndpoint;

    if (pagination != null) {
      url = `${url}?$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }

    return this.apiService.get(url);
  }

  getById(id) {
    return this.apiService.get(this.getByIdEndpoint + '/' + id);
  }

  update(data) {
    return this.apiService.put(this.putUpdateEndpoint, data);
  }

  delete(id) {
    return this.apiService.delete(this.deleteEndpoint + '/' + id);
  }
}
