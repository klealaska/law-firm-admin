import { Injectable } from '@angular/core';
import { Pagination } from '../../Interfaces/Pagination';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LawArticleVersionService {

  private getLawArticleVersionsAndDetailsEndpoint = 'LawArticleVersions/GetLawArticleVersionsAndDetails';
  private getVersionByIdEndpoint = 'LawArticleVersions/GetVersionById';
  private putUpdateEndpoint = 'LawArticleVersions/Update';
  private postAddEndpoint = 'LawArticleVersions/Add';
  private deleteEndpoint = 'LawArticleVersions/Delete';
  private deleteDetailsEndpoint = 'LawArticleVersions/Delete/VersionDetails';

  constructor(private apiService: ApiService) { }

  postAdd(data) {
    return this.apiService.post(this.postAddEndpoint, data);
  }

  update(data) {
    return this.apiService.post(this.putUpdateEndpoint, data);
  }

  delete(id) {
    return this.apiService.delete(this.deleteEndpoint + '/' + id);
  }

  deleteVersionDetails(id) {
    return this.apiService.delete(this.deleteDetailsEndpoint + '/' + id);
  }

  getLawArticleVersionsAndDetails(language, lawId?, pagination?: Pagination) {
    console.log(lawId);

    let url = `${language}/${this.getLawArticleVersionsAndDetailsEndpoint}`;
    if (lawId != null) {
      url = `${url}?lawId=${lawId}&`;
    } else {
      url = `${url}?`;
    }
    if (pagination != null) {
      url = `${url}$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }
    return this.apiService.get(url);
  }

  getVersionById(versionId) {
    return this.apiService.get(this.getVersionByIdEndpoint + '/' + versionId);
  }
}
