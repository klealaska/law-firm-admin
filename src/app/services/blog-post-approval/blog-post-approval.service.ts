import { Injectable } from '@angular/core';
import { Pagination } from '../../Interfaces/Pagination';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogPostApprovalService {

  private postAddEndpoint = 'blogPostsApproval/add';
  private getEndpoint = 'blogPostsApproval/getBlogPostsApproval';
  private getByIdEndpoint = 'blogPostsApproval/getBlogPostApprovalById';
  private putUpdateEndpoint = 'BlogPostsApproval/update';
  private deleteEndpoint = 'blogPostsApproval/delete';
  private publishEndpoint = 'blogPostsApproval/publish';
  private sendForApprovalEndpoint = 'blogPostsApproval/sendForApproval';
  private getBlogPostInEditStatusEndpoint = 'blogPostsApproval/changeBlogPostInEditStatus';
  private getBlogPostWithPendingApprovalStatusEndpoint = 'blogPostsApproval/getBlogPostInPendingApprovalStatus';
  private getDenyBlogPostApprovalEndpoint = 'blogPostsApproval/DenyApproval';

  constructor(private apiService: ApiService) { }

  postAdd(data) {
    return this.apiService.post(this.postAddEndpoint, data);
  }

  sendForApproval(id) {
    return this.apiService.get(this.sendForApprovalEndpoint + '/' + id);
  }

  getAll(pagination?: Pagination) {
    let url = this.getEndpoint;

    if (pagination != null) {
      url = `${url}?$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }

    return this.apiService.get(url);
  }

  getBlogPostWithPendingApprovalStatus(pagination?: Pagination) {

    let url = this.getBlogPostWithPendingApprovalStatusEndpoint;

    if (pagination != null) {
      url = `${url}?$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }

    return this.apiService.get(url);
  }

  getById(id) {
    return this.apiService.get(this.getByIdEndpoint + '/' + id);
  }

  refuseApproval(id) {
    return this.apiService.get(this.getDenyBlogPostApprovalEndpoint + '/' + id);
  }

  publish(id) {
    return this.apiService.get(this.publishEndpoint + '/' + id);
  }

  changeBlogPostInEditStatus(id) {
    return this.apiService.get(this.getBlogPostInEditStatusEndpoint + '/' + id);
  }

  update(data) {
    return this.apiService.put(this.putUpdateEndpoint, data);
  }

  delete(id) {
    return this.apiService.delete(this.deleteEndpoint + '/' + id);
  }
}
