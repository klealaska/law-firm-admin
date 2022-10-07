import { Pagination } from './../../Interfaces/Pagination';
import { languageEnum } from './../../enums/languageEnum';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LawAmendmentService {

  private getByIdEndpoint = 'lawAmendments/getByLawId';
  private getTrackChangesEndpoint = 'trackChanges/GetAllTrackChanges';
  private postAddEndpoint = 'lawAmendments/add';
  private putUpdateEndpoint = 'lawAmendments/update';
  private deleteEndpoint = 'lawAmendments/delete';
  private getSendToApproveEndpoint = 'lawAmendments/sendForApproval';
  private getIgnoreToEditStatusEndpoint = 'lawAmendments/denyApproval';
  private getLawForAmendmentEndpoint = 'lawAmendments/getLawForAmendment';
  private getLawsForApprovalEndpoint = 'lawAmendments/getLawsForApproval';
  private GetLawAmendmentsByLawCategoryIdEndpoint = 'lawAmendments/GetLawAmendmentsByLawCategoryId';

  constructor(private apiService: ApiService) { }

  getById(id, language?) {
    if (language != null) {
      return this.apiService.get(`${language}/${this.getByIdEndpoint}/${id}`);
    } else {
      return this.apiService.get(this.getByIdEndpoint + '/' + id);
    }
  }

  getToApprove(id, language?) {
    if (language != null) {
      return this.apiService.get(`${language}/${this.getSendToApproveEndpoint}/${id}`);
    } else {
      return this.apiService.get(`${this.getSendToApproveEndpoint}/${id}`);
    }
  }

  getLawForAmendment(id, language?) {
    if (language != null) {
      return this.apiService.get(`${language}/${this.getLawForAmendmentEndpoint}/${id}`);
    } else {
      return this.apiService.get(`${this.getLawForAmendmentEndpoint}/${id}`);
    }
  }

  ignore(id, language?) {
    if (language != null) {
      return this.apiService.get(`${language}/${this.getIgnoreToEditStatusEndpoint}/${id}`);
    } else {
      return this.apiService.get(`${this.getIgnoreToEditStatusEndpoint}/${id}`);
    }
  }

  getTrackChanges(id) {
    return this.apiService.get(this.getTrackChangesEndpoint + '/' + id);
  }

  add(data, language?) {
    if (language != null) {
      return this.apiService.post(`${language}/${this.postAddEndpoint}`, data);
    } else {
      return this.apiService.post(this.postAddEndpoint, data);
    }
  }

  update(data, language?) {
    if (language != null) {
      return this.apiService.put(`${language}/${this.putUpdateEndpoint}`, data);
    } else {
      return this.apiService.put(this.putUpdateEndpoint, data);
    }
  }

  delete(id, language?) {
    if (language != null) {
      return this.apiService.delete(`${language}/${this.deleteEndpoint}/${id}`);
    } else {
      return this.apiService.delete(`${this.deleteEndpoint}/${id}`);
    }
  }

  getLawAmendmentsByLawCategoryId(language: languageEnum, id?: any, pagination?: Pagination) {
    let url = `${this.GetLawAmendmentsByLawCategoryIdEndpoint}`;
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

  getLawsForApproval(lawCategoryId?, language?, pagination?: Pagination) {
    let url = `${this.getLawsForApprovalEndpoint}`;
    if (lawCategoryId != null) {
      url = `${url}?lawCategoryId=${lawCategoryId}&`;
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
}
