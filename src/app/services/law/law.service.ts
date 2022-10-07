import { Injectable } from '@angular/core';
import { Pagination } from '../../Interfaces/Pagination';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LawService {

  private postAddEndpoint = 'laws/add';
  private addTranslationEndpoint = 'laws/addTranslation';
  private getByIdEndpoint = 'laws/getById';
  private publishLawEndpoint = 'laws/publishLaw';
  private putUpdateEndpoint = 'laws/update';
  private deleteLawEndpoint = 'laws/deleteLaw';
  private denyDeletionEndpoint = 'laws/denyDeletion';
  private sendDeletionForApprovalEndpoint = 'laws/sendDeletionForApproval';
  private getAllWithLinksEndpoint = 'laws/getAllWithRelatedLinks';
  private deleteAllrelatedLinksEndpoint = 'laws/deleteLawRelatedLinks';
  private getLawsWithDeletionStatusEndpoint = 'laws/getLawsWithDeletionStatusForApproval';

  constructor(private apiService: ApiService) { }

  postAdd(data, language?) {
    if (language != null) {
      return this.apiService.post(`${language}/${this.postAddEndpoint}`, data);
    } else {
      return this.apiService.post(this.postAddEndpoint, data);
    }
  }


  addTranslation(data, language?) {
    if (language != null) {
      return this.apiService.post(`${language}/${this.addTranslationEndpoint}`, data);
    } else {
      return this.apiService.post(this.addTranslationEndpoint, data);
    }
  }

  getAllWithLinks(language?, pagination?: Pagination) {
    let url = this.getAllWithLinksEndpoint;
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

  publishLaw(id, language?) {
    if (language != null) {
      return this.apiService.get(`${language}/${this.publishLawEndpoint}/${id}`);
    } else {
      return this.apiService.get(`${this.publishLawEndpoint}/${id}`);
    }
  }

  update(data, language?) {
    if (language != null) {
      return this.apiService.put(`${language}/${this.putUpdateEndpoint}`, data);
    } else {
      return this.apiService.put(this.putUpdateEndpoint, data);
    }
  }

  deleteLaw(id, language?) {
    if (language != null) {
      return this.apiService.delete(`${language}/${this.deleteLawEndpoint}/${id}`);
    } else {
      return this.apiService.delete(`${this.deleteLawEndpoint}/${id}`);
    }
  }

  denyDeletion(id, language?) {
    if (language != null) {
      return this.apiService.get(`${language}/${this.denyDeletionEndpoint}/${id}`);
    } else {
      return this.apiService.get(`${this.denyDeletionEndpoint}/${id}`);
    }
  }

  sendDeletionForApproval(id, language?) {
    if (language != null) {
      return this.apiService.get(`${language}/${this.sendDeletionForApprovalEndpoint}/${id}`);
    } else {
      return this.apiService.get(`${this.sendDeletionForApprovalEndpoint}/${id}`);
    }
  }

  deleteAllRelatedLinks(id, language?) {
    if (language != null) {
      return this.apiService.get(`${language}/${this.deleteAllrelatedLinksEndpoint}/${id}`);
    } else {
      return this.apiService.get(`${this.deleteAllrelatedLinksEndpoint}/${id}`);
    }
  }

  getLawsForDeletionApproval(language?, pagination?: Pagination) {
    // if (language != null) {
    //   return this.apiService.get(`${language}/${this.getLawsWithDeletionStatusEndpoint}`);
    // } else {
    //   return this.apiService.get(this.getLawsWithDeletionStatusEndpoint);
    // }

    let url = this.getLawsWithDeletionStatusEndpoint;
    if (language != null) {
      url = `${language}/${url}`;
    }

    if (pagination != null) {
      url = `${url}?$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }

    return this.apiService.get(url);
  }
}
