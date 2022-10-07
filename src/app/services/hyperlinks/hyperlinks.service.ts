import { Pagination } from './../../Interfaces/Pagination';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class HyperlinksService {


  private getAllEndpoint = 'HyperLink/GetAll';
  private getByIdEndpoint = 'HyperLink/GetById';
  private putUpdateEndpoint = 'HyperLink/Update';
  private postAddEndpoint = 'HyperLink/Add';
  private deleteEndpoint = 'HyperLink/Remove';

  constructor(private apiService: ApiService) { }

  getLinksByLawId(id?, language?, pagination?: Pagination) {
    let url = `${this.getAllEndpoint}`;
    if (id != null) {
      url = `${url}?id=${id}&`;
    } else {
      url = `${url}?`;
    }
    if (language != null) {
      url = `${language}/${url}`;
    }
    if (pagination != null) {
      url = `${url}$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }
    return this.apiService.get(url);
  }

  postAdd(data) {
    return this.apiService.post(this.postAddEndpoint, data);
  }

  delete(id) {
    return this.apiService.delete(this.deleteEndpoint + '/' + id);
  }

  update(data) {
    return this.apiService.put(this.putUpdateEndpoint, data);
  }
  getById(id) {
    return this.apiService.get(this.getByIdEndpoint + '/' + id);
  }

}
