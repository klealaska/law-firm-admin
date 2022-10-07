import { Injectable } from '@angular/core';
import { Pagination } from '../../Interfaces/Pagination';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LawArticleHistoryService {

  private getLawArticleHistoryBySectionIdEndpoint = 'lawArticleHistory/getLawArticleHistoryBySectionId';
  private getLawArticleHistoryByIdEndpoint = 'lawArticleHistory/getLawArticleHistoryById'

  constructor(private apiService: ApiService) { }

  getLawArticleHistoryBySectionId(language, id?, pagination?: Pagination) {
    let url = `${language}/${this.getLawArticleHistoryBySectionIdEndpoint}`;
    if (id != null) {
      url = `${url}?id=${id}&`;
    } else {
      url = `${url}?`;
    }
    if (pagination != null) {
      url = `${url}$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }

    return this.apiService.get(url);
  }

  getLawArticleHistoryById(id) {
    return this.apiService.get(this.getLawArticleHistoryByIdEndpoint + '/' + id);
  }

}
