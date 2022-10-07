import { Pagination } from './../../Interfaces/Pagination';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomepageLawConfigurationService {

  private postAddEndpoint = 'homePageLawConfiguration/add';
  private getEndpoint = 'homePageLawConfiguration/getAll';
  private getByIdEndpoint = 'homePageLawConfiguration/getById';
  private putUpdateEndpoint = 'homePageLawConfiguration/update';
  private updateStatusEndpoint = 'homePageLawConfiguration/updateVisibility';
  private addTranslationEndpoint = 'homePageLawConfiguration/addTranslation';

  constructor(private apiService: ApiService) { }

  postAdd(data, language?: string) {
    if (language != null) {
      return this.apiService.post(`${language}/${this.postAddEndpoint}`, data);
    } else {
      return this.apiService.post(this.postAddEndpoint, data);
    }
  }

  postAddTranslation(data, language?: string) {
    if (language != null) {
      return this.apiService.post(`${language}/${this.addTranslationEndpoint}`, data);
    } else {
      return this.apiService.post(this.addTranslationEndpoint, data);
    }
  }

  getAll(language?: string, pagination?: Pagination) {

    let url = this.getEndpoint;

    if (language != null) {
      url = `${language}/${url}`;
    }

    if (pagination != null) {
      url = `${url}?$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }

    return this.apiService.get(url);
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

  updateStatus(id, language?: string) {
    if (language != null) {
      return this.apiService.get(`${language}/${this.updateStatusEndpoint}/${id}`);
    } else {
      return this.apiService.get(`${this.updateStatusEndpoint}/${id}`);
    }
  }
}
