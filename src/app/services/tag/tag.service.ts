import { Injectable } from '@angular/core';
import { Pagination } from '../../Interfaces/Pagination';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private postAddEndpoint = 'tag/add';
  private getEndpoint = 'tag/getAll';
  private getByIdEndpoint = 'tag/getById';
  private putUpdateEndpoint = 'tag/update';
  private deleteEndpoint = 'tag/delete';

  constructor(private apiService: ApiService) { }

  postAdd(data) {
    return this.apiService.post(this.postAddEndpoint, data);
  }

  getAll(pagination?: Pagination, language?: string) {
    let url = `${this.getEndpoint}?`;

    if (language != null) {
      url = `${url}language=${language}`
    }

    if (language != null && pagination != null) {
      url = `${url}&`
    }

    if (pagination != null) {
      url = `${url}$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
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
