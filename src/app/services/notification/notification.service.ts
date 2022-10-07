import { Injectable } from '@angular/core';
import { Pagination } from '../../Interfaces/Pagination';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private postCreateGroupEndpoint = 'notifications/createNotificationGroup';
  private putUpdateGroupEndpoint = 'notifications/updateNotificationGroup';
  private postPublishEndpoint = 'notifications/publishNotification';
  private postReadEndpoint = 'notifications/readNotification';
  private getGroupsEndpoint = 'notificationGroups/getAllNotificationGroups';
  private getNotificationEndpoint = 'notifications/getNotifications';
  private deleteNotificationGroupEndpoint = 'notifications/DeleteNotificationGroup';

  constructor(private apiService: ApiService) { }

  postCreateNotificationGroup(data) {
    return this.apiService.post(this.postCreateGroupEndpoint, data);
  }

  postPublishNotification(data) {
    return this.apiService.post(this.postPublishEndpoint, data);
  }

  updateNotificationGroup(data) {
    return this.apiService.put(this.putUpdateGroupEndpoint, data);
  }

  postReadNotification(data) {
    return this.apiService.post(this.postReadEndpoint, data);
  }

  getAllNotificationGroups(pagination?: Pagination) {
    let url = this.getGroupsEndpoint;

    if (pagination != null) {
      url = `${url}?$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }

    return this.apiService.get(url);
  }

  getNotificatios(slug) {
    return this.apiService.get(this.getNotificationEndpoint + '/' + slug);
  }

  deleteNotificationGroup(slug) {
    return this.apiService.delete(this.deleteNotificationGroupEndpoint + '/' + slug);
  }
}
