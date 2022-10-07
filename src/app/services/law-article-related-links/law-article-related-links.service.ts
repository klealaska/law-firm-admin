import { Injectable } from '@angular/core';
import { Pagination } from '../../Interfaces/Pagination';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LawArticleRelatedLinksService {

  private postAddEndpoint = 'lawArticleRelatedLinks/add';
  private getEndpoint = 'lawArticleRelatedLinks/getAll';
  private getByIdEndpoint = 'lawArticleRelatedLinks/getById';
  private getByLawArticleIdEndpoint = 'lawArticleRelatedLinks/getByLawArticleId';
  private getLawArticleRelatedLinksBySectionIdEndpoint = 'lawArticleRelatedLinks/getLawArticleRelatedLinksBySectionId';
  private putUpdateEndpoint = 'lawArticleRelatedLinks/update';
  private deleteEndpoint = 'lawArticleRelatedLinks/delete';

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

  getByLawArticleId(id) {
    return this.apiService.get(this.getByLawArticleIdEndpoint + '/' + id);
  }

  getLawArticleRelatedLinksBySectionId(id?, language?, pagination?: Pagination) {
    let url = `${this.getLawArticleRelatedLinksBySectionIdEndpoint}`;
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
