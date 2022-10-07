import { Pagination } from './../../Interfaces/Pagination';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomepageVideoService {

  private postAddEndpoint = 'homepageVideo/add';
  private getEndpoint = 'homepageVideo/getAll';
  private getByIdEndpoint = 'homepageVideo/getById';
  private putUpdateEndpoint = 'homepageVideo/update';
  private updateStatusEndpoint = 'homepageVideo/updateVisibility';
  private deleteEndpoint = 'homepageVideo/delete';

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

  updateStatus(id) {
    return this.apiService.get(this.updateStatusEndpoint + '/' + id);
  }

  delete(id) {
    return this.apiService.delete(this.deleteEndpoint + '/' + id);
  }
}
