import { Injectable } from '@angular/core';
import { Pagination } from '../../Interfaces/Pagination';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private postAddEndpoint = 'blogPosts/add';
  private getEndpoint = 'blogPosts/getAll';
  private getByIdEndpoint = 'blogPosts/getById';
  private putUpdateEndpoint = 'blogPosts/update';
  private deleteEndpoint = 'blogPosts/delete';
  private getDenyDeletionEndpoint = 'blogPosts/DenyDeletion';
  private sendDeletionForApprovalEndpoint = 'blogPosts/sendDeletionForApproval';
  private getBlogsWithDeletionStatusEndpoint = 'blogPosts/getBlogsWithDeletionStatus';

  constructor(private apiService: ApiService) { }

  postAdd(data) {
    return this.apiService.post(this.postAddEndpoint, data);
  }

  getAll(pagination?: Pagination) {
    let url = this.getEndpoint

    if (pagination != null) {
      url = `${url}?$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }

    return this.apiService.get(url);
  }

  getAllWithDeletionStatus(pagination?: Pagination) {

    let url = this.getBlogsWithDeletionStatusEndpoint

    if (pagination != null) {
      url = `${url}?$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }

    return this.apiService.get(url);
  }

  getById(id) {
    return this.apiService.get(this.getByIdEndpoint + '/' + id);
  }

  denyDeletion(id) {
    return this.apiService.get(this.getDenyDeletionEndpoint + '/' + id);
  }

  sendDeletionForApproval(id) {
    return this.apiService.get(this.sendDeletionForApprovalEndpoint + '/' + id);
  }

  update(data) {
    return this.apiService.put(this.putUpdateEndpoint, data);
  }

  delete(id) {
    return this.apiService.delete(this.deleteEndpoint + '/' + id);
  }
}
