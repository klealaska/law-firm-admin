import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { StorageService } from '../storage/storage.service';
import { Pagination } from '../../Interfaces/Pagination';


@Injectable({
  providedIn: 'root'
})
export class TaxNewsService {

  private postAddEndpoint = 'taxNews/add';
  private getEndpoint = 'taxNews/getAll';
  private getByIdEndpoint = 'taxNews/getById';
  private putUpdateEndpoint = 'taxNews/update';
  private deleteEndpoint = 'taxNews/delete';

  constructor(private apiService: ApiService, private storageService: StorageService) { }

  getAll(pagination?: Pagination, language?: string) {
    let url = this.getEndpoint;
    if (language != null) {
      url = `${language}/${url}`;
    }
    if (pagination != null) {
      url = `${url}?$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }
    return this.apiService.get(url);
  }

  postAdd(data, language?: string) {
    if (language != null) {
      return this.apiService.post(`${language}/${this.postAddEndpoint}`, data);
    } else {
      return this.apiService.post(this.postAddEndpoint, data);
    }
  }

  getById(id, language?: string) {
    if (language != null) {
      return this.apiService.get(`${language}/${this.getByIdEndpoint}/${id}`);
    } else {
      return this.apiService.get(`${this.getByIdEndpoint}/${id}`);
    }
  }

  update(data, language?: string) {
    if (language != null) {
      return this.apiService.put(`${language}/${this.putUpdateEndpoint}`, data);
    } else {
      return this.apiService.put(this.putUpdateEndpoint, data);
    }
  }

  delete(id, language?: string) {
    if (language != null) {
      return this.apiService.delete(`${language}/${this.deleteEndpoint}/${id}`);
    } else {
      return this.apiService.delete(`${this.deleteEndpoint}/${id}`);
    }
  }
}
