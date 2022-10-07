import { Injectable } from '@angular/core';
import { Pagination } from '../../Interfaces/Pagination';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserCategoryService {

  private postAddEndpoint = 'userCategories/add';
  private getEndpoint = 'userCategories/getAll';
  private getByIdEndpoint = 'userCategories/getById';
  private putUpdateEndpoint = 'userCategories/update';
  private deleteEndpoint = 'userCategories/delete';

  constructor(private apiService: ApiService) { }

  postAdd(data) {
    return this.apiService.post(this.postAddEndpoint, data);
  }

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
