import { Pagination } from './../../Interfaces/Pagination';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ImportantTaxDateService {

  private postAddEndpoint = 'importantTaxDate/add';
  private getEndpoint = 'importantTaxDate/getAll';
  private getByIdEndpoint = 'importantTaxDate/getById';
  private putUpdateEndpoint = 'importantTaxDate/update';
  private deleteEndpoint = 'importantTaxDate/delete';
  private addTranslationEndpoint = 'importantTaxDate/addTranslation';

  constructor(private apiService: ApiService) { }

  postAdd(data, language?: string) {
    if (language != null) {
      return this.apiService.post(`${language}/${this.postAddEndpoint}`, data);
    } else {
      return this.apiService.post(this.postAddEndpoint, data);
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

  getById(id, language?) {
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

  addTranslation(data, language?: string) {
    if (language != null) {
      return this.apiService.put(`${language}/${this.addTranslationEndpoint}`, data);
    } else {
      return this.apiService.put(this.addTranslationEndpoint, data);
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
